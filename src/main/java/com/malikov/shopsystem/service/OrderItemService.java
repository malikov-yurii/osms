package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderLine;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.OrderItemRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductPrice;
import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductVariationPrice;

@Service
public class OrderItemService {

    private static final int NEW_PRODUCT_QUANTITY = 1;

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductVariationRepository productVariationRepository;
    @Autowired
    private UpdateStockService updateStockService;

    @Transactional
    public OrderLine save(OrderLine orderLine) {
        orderLine = orderItemRepository.save(orderLine);
        recalculateAndUpdateTotalSum(orderLine);
        return orderLine;
    }

    @Transactional
    public BigDecimal updateAndReturnTotalSum(OrderLineDto orderLineDto) {
        OrderLine orderLine = get(orderLineDto.getOrderItemId());

        boolean isNameUpdated = setName(orderLineDto, orderLine);

        boolean isProductOrProductVariationUpdated = setProductVariation(orderLineDto, orderLine);
        if (!isProductOrProductVariationUpdated) {
            isProductOrProductVariationUpdated = setProduct(orderLineDto, orderLine);
        }

        boolean isPriceOrQuantityUpdated = setPrice(orderLineDto, orderLine)
                || setQuantityAndUpdateStock(orderLineDto, orderLine);

        if (isNameUpdated || isPriceOrQuantityUpdated || isProductOrProductVariationUpdated) {
            orderItemRepository.save(orderLine);
        }

        return isPriceOrQuantityUpdated || isProductOrProductVariationUpdated
                ? recalculateAndUpdateTotalSum(orderLine)
                : orderLine.getOrder().getTotalValue();
    }

    private boolean setProduct(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (orderLineDto.getProductId() == null) {
            return false;
        }
        returnToStockPreviousProduct(orderLine);
        Product newProduct = productRepository.findOne(orderLineDto.getProductId());
        setProductForOrderItem(orderLine, newProduct);
        updateStockService.updateStock(orderLine, (-1) * NEW_PRODUCT_QUANTITY);
        orderLine.setProductQuantity(NEW_PRODUCT_QUANTITY);
        return true;
    }

    private boolean setProductVariation(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (orderLineDto.getProductVariationId() == null) {
            return false;
        }
        returnToStockPreviousProduct(orderLine);
        ProductVariation newProductVariation = productVariationRepository.findOne(orderLineDto.getProductVariationId());
        setProductVariationForOrderItem(orderLine, newProductVariation);
        updateStockService.updateStock(orderLine, (-1) * NEW_PRODUCT_QUANTITY);

        orderLine.setProductQuantity(NEW_PRODUCT_QUANTITY);
        return true;
    }

    private void returnToStockPreviousProduct(OrderLine orderLine) {
        updateStockService.updateStock(orderLine, orderLine.getProductQuantity());
    }

    private void setProductVariationForOrderItem(OrderLine orderLine, ProductVariation newProductVariation) {
        orderLine.setProduct(newProductVariation.getProduct());
        orderLine.setProductVariation(newProductVariation);
        orderLine.setProductName(newProductVariation.getProduct().getName() + " "
                + newProductVariation.getVariationValue().getName());
        orderLine.setProductPrice(calculateProductVariationPrice(newProductVariation));
    }

    private void setProductForOrderItem(OrderLine orderLine, Product newProduct) {
        orderLine.setProduct(newProduct);
        orderLine.setProductName(newProduct.getName());
        orderLine.setProductPrice(calculateProductPrice(newProduct));
    }

    private boolean setName(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (orderLineDto.getName() == null) {
            return false;
        }
        orderLine.setProductName(orderLineDto.getName());
        return true;
    }

    private boolean setPrice(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (orderLineDto.getPrice() == null) {
            return false;
        }
        orderLine.setProductPrice(orderLineDto.getPrice());
        return true;
    }

    private boolean setQuantityAndUpdateStock(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (orderLineDto.getQuantity() == null) {
            return false;
        }
        updateStockService.updateStock(orderLine, orderLine.getProductQuantity() - orderLineDto.getQuantity());
        orderLine.setProductQuantity(orderLineDto.getQuantity());
        orderItemRepository.save(orderLine);

        return true;
    }

    private BigDecimal recalculateAndUpdateTotalSum(OrderLine orderLine) {
        Order order = orderRepository.findOne(orderLine.getOrder().getId());
        BigDecimal totalSum = calculateTotalSum(order.getOrderItems());
        order.setTotalValue(totalSum);
        orderRepository.save(order);
        return totalSum;
    }

    private BigDecimal calculateTotalSum(Collection<OrderLine> orderLines) {
        return orderLines.stream().
                reduce(
                        BigDecimal.ZERO,
                        (sum, oi) -> sum.add(oi.getProductPrice().multiply(new BigDecimal(oi.getProductQuantity()))),
                        BigDecimal::add
                );
    }

    public OrderLine get(Long id) {
        return orderItemRepository.findOne(id);
    }

    @Transactional
    public BigDecimal delete(Long orderItemId) {
        OrderLine orderLine = get(orderItemId);
        returnToStockPreviousProduct(orderLine);
        orderLine.getOrder().getOrderItems().remove(orderLine);
        orderItemRepository.delete(orderLine);

        return recalculateAndUpdateTotalSum(orderLine);
    }

    @Transactional
    public OrderLine createNewEmpty(Long orderId) {
        OrderLine orderLine = new OrderLine();
        orderLine.setOrder(orderRepository.findOne(orderId));
        return orderItemRepository.save(orderLine);
    }

    public List<ProductAutocompleteDto> getByProductMask(String productNameMask) {
        List<ProductAutocompleteDto> productAutocompleteDtos = new ArrayList<>();
        productRepository.getByNameLike("%" + productNameMask.replaceAll(",", "") + "%").forEach(product -> {
            if (product.getHasVariations()) {
                for (ProductVariation productVariation : product.getVariations()) {
                    productAutocompleteDtos.add(
                            new ProductAutocompleteDto(
                                    product.getName() + " "
                                            + productVariation.getVariationValue().getName() + " "
                                            + calculateProductVariationPrice(productVariation),
                                    product.getId(),
                                    productVariation.getId(),
                                    product.getName() + " "
                                            + productVariation.getVariationValue().getName(),
                                    calculateProductVariationPrice(productVariation)
                            )
                    );
                }
            } else {
                productAutocompleteDtos.add(
                        new ProductAutocompleteDto(
                                product.getName() + " " + calculateProductPrice(product),
                                product.getId(),
                                0L,
                                product.getName(),
                                calculateProductPrice(product)
                        )
                );
            }
        });

        return productAutocompleteDtos;
    }

}
