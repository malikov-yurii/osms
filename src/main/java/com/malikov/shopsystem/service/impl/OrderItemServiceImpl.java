package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.OrderItemDto;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.OrderItemRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import com.malikov.shopsystem.service.OrderItemService;
import com.malikov.shopsystem.util.OrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class OrderItemServiceImpl implements OrderItemService {

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

    @Override
    @Transactional
    public OrderItem save(OrderItem orderItem) {
        orderItem = orderItemRepository.save(orderItem);
        recalculateAndUpdateTotalSum(orderItem);
        return orderItem;
    }

    @Override
    @Transactional
    public BigDecimal updateAndReturnTotalSum(OrderItemDto orderItemDto) {
        OrderItem orderItem = get(orderItemDto.getOrderItemId());

        boolean isNameUpdated = setName(orderItemDto, orderItem);

        boolean isProductOrProductVariationUpdated = setProductVariation(orderItemDto, orderItem);
        if (!isProductOrProductVariationUpdated) {
            isProductOrProductVariationUpdated = setProduct(orderItemDto, orderItem);
        }

        boolean isPriceOrQuantityUpdated = setPrice(orderItemDto, orderItem)
                || setQuantityAndUpdateStock(orderItemDto, orderItem);

        if (isNameUpdated || isPriceOrQuantityUpdated || isProductOrProductVariationUpdated) {
            orderItemRepository.save(orderItem);
        }

        return isPriceOrQuantityUpdated || isProductOrProductVariationUpdated
                ? recalculateAndUpdateTotalSum(orderItem)
                : orderItem.getOrder().getTotalSum();
    }

    private boolean setProduct(OrderItemDto orderItemDto, OrderItem orderItem) {
        if (orderItemDto.getProductId() == null) {
            return false;
        }
        returnToStockPreviousProduct(orderItem);
        Product newProduct = productRepository.findOne(orderItemDto.getProductId());
        setProductForOrderItem(orderItem, newProduct);
        updateStockService.updateStock(orderItem, (-1) * NEW_PRODUCT_QUANTITY);
        orderItem.setProductQuantity(NEW_PRODUCT_QUANTITY);
        return true;
    }

    private boolean setProductVariation(OrderItemDto orderItemDto, OrderItem orderItem) {
        if (orderItemDto.getProductVariationId() == null) {
            return false;
        }
        returnToStockPreviousProduct(orderItem);
        ProductVariation newProductVariation = productVariationRepository.findOne(orderItemDto.getProductVariationId());
        setProductVariationForOrderItem(orderItem, newProductVariation);
        updateStockService.updateStock(orderItem, (-1) * NEW_PRODUCT_QUANTITY);

        orderItem.setProductQuantity(NEW_PRODUCT_QUANTITY);
        return true;
    }

    private void returnToStockPreviousProduct(OrderItem orderItem) {
        updateStockService.updateStock(orderItem, orderItem.getProductQuantity());
    }

    private void setProductVariationForOrderItem(OrderItem orderItem, ProductVariation newProductVariation) {
        orderItem.setProduct(newProductVariation.getProduct());
        orderItem.setProductVariation(newProductVariation);
        orderItem.setProductName(newProductVariation.getProduct().getName() + " "
                + newProductVariation.getVariationValue().getName());
        orderItem.setProductPrice(newProductVariation.getPrice());
    }

    private void setProductForOrderItem(OrderItem orderItem, Product newProduct) {
        orderItem.setProduct(newProduct);
        orderItem.setProductName(newProduct.getName());
        orderItem.setProductPrice(newProduct.getPrice());
    }

    private boolean setName(OrderItemDto orderItemDto, OrderItem orderItem) {
        if (orderItemDto.getName() == null) {
            return false;
        }
        orderItem.setProductName(orderItemDto.getName());
        return true;
    }

    private boolean setPrice(OrderItemDto orderItemDto, OrderItem orderItem) {
        if (orderItemDto.getPrice() == null) {
            return false;
        }
        orderItem.setProductPrice(orderItemDto.getPrice());
        return true;
    }

    private boolean setQuantityAndUpdateStock(OrderItemDto orderItemDto, OrderItem orderItem) {
        if (orderItemDto.getQuantity() == null) {
            return false;
        }
        updateStockService.updateStock(orderItem, orderItem.getProductQuantity() - orderItemDto.getQuantity());
        orderItem.setProductQuantity(orderItemDto.getQuantity());
        orderItemRepository.save(orderItem);

        return true;
    }

    private BigDecimal recalculateAndUpdateTotalSum(OrderItem orderItem) {
        Order order = orderRepository.findOne(orderItem.getOrder().getId());
        BigDecimal totalSum = OrderUtil.calculateTotalSum(order.getOrderItems());
        order.setTotalSum(totalSum);
        orderRepository.save(order);
        return totalSum;
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public OrderItem get(Long id) {
        return orderItemRepository.findOne(id);
    }

    @Override
    @Transactional
    public BigDecimal delete(Long orderItemId) {
        OrderItem orderItem = get(orderItemId);
        returnToStockPreviousProduct(orderItem);
        orderItem.getOrder().getOrderItems().remove(orderItem);
        orderItemRepository.delete(orderItem);

        return recalculateAndUpdateTotalSum(orderItem);
    }

    @Override
    @Transactional
    public OrderItem createNewEmpty(Long orderId) {
        return orderItemRepository.save(new OrderItem(orderRepository.findOne(orderId),
                null, "", new BigDecimal(0), 0));
    }

    @Override
    public List<ProductAutocompleteDto> getByProductMask(String productNameMask) {
        List<ProductAutocompleteDto> productAutocompleteDtos = new ArrayList<>();
        productRepository.getByNameLike("%" + productNameMask.replaceAll(",", "") + "%").forEach(product -> {
            if (product.getHasVariations()) {
                for (ProductVariation productVariation : product.getVariations()) {
                    productAutocompleteDtos.add(
                            new ProductAutocompleteDto(
                                    product.getName() + " "
                                            + productVariation.getVariationValue().getName() + " "
                                            + productVariation.getPrice().setScale(0, RoundingMode.HALF_UP),
                                    product.getId(),
                                    productVariation.getId(),
                                    product.getName() + " "
                                            + productVariation.getVariationValue().getName(),
                                    productVariation.getPrice()
                            )
                    );
                }
            } else {
                productAutocompleteDtos.add(
                        new ProductAutocompleteDto(
                                product.getName() + " " + product.getPrice().setScale(0, RoundingMode.HALF_UP),
                                product.getId(),
                                0L,
                                product.getName(),
                                product.getPrice()
                        )
                );
            }
        });
        return productAutocompleteDtos;
    }

}
