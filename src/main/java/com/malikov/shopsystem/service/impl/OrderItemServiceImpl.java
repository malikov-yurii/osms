package com.malikov.shopsystem.service.impl;

import com.malikov.shopsystem.dto.OrderItemAutocompleteDto;
import com.malikov.shopsystem.dto.OrderItemLiteDto;
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
import java.util.Objects;

import static com.malikov.shopsystem.util.OrderStatusUtil.isWithdrawalStatus;

@Service
@Transactional(readOnly = true)
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariationRepository productVariationRepository;

    @Override
    @Transactional
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    @Transactional
    public void setProduct(Long itemId, Long newProductId) {
        Objects.requireNonNull(newProductId);
        OrderItem orderItem = orderItemRepository.findOne(itemId);

        returnToStockPreviousProducts(orderItem);

        Product newProduct = productRepository.findOne(newProductId);

        setProductForOrderItem(orderItem, newProduct);

        if (isWithdrawalStatus(orderItem.getOrder().getStatus())) {
            newProduct.setQuantity(newProduct.getQuantity() - 1);
            productRepository.save(newProduct);
        }

        orderItem.setProductQuantity(1);
        orderItemRepository.save(orderItem);
    }

    @Override
    @Transactional
    public void setProductVariation(Long itemId, Long newProductVariationId) {
        Objects.requireNonNull(newProductVariationId);
        OrderItem orderItem = orderItemRepository.findOne(itemId);

        returnToStockPreviousProducts(orderItem);

        ProductVariation newProductVariation = productVariationRepository.findOne(newProductVariationId);

        setProductVariationForOrderItem(orderItem, newProductVariation);

        if (isWithdrawalStatus(orderItem.getOrder().getStatus())) {
            newProductVariation.setQuantity(newProductVariation.getQuantity() - 1);
            productVariationRepository.save(newProductVariation);
        }

        orderItem.setProductQuantity(1);
        orderItemRepository.save(orderItem);
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

    private void returnToStockPreviousProducts(OrderItem orderItem) {
        if (orderItem.getProductVariation() != null) {
            ProductVariation oldProductVariation = orderItem.getProductVariation();
            oldProductVariation.setQuantity(oldProductVariation.getQuantity() + orderItem.getProductQuantity());
            productVariationRepository.save(oldProductVariation);
        } else if (orderItem.getProduct() != null) {
            Product oldProduct = orderItem.getProduct();
            oldProduct.setQuantity(oldProduct.getQuantity() + orderItem.getProductQuantity());
            productRepository.save(oldProduct);
        }
    }

    @Override
    @Transactional
    public void update(Long orderItemId, OrderItemLiteDto orderItemLiteDto) {
        OrderItem orderItem = get(orderItemId);
        orderItem.setProductName(orderItemLiteDto.getOrderItemName());
        orderItem.setProductPrice(orderItemLiteDto.getPrice());
        orderItemRepository.save(orderItem);
    }

    @Override
    @Transactional
    public void updateProductName(Long id, String newProductName) {
        OrderItem orderItem = get(id);
        orderItem.setProductName(newProductName);
        orderItemRepository.save(orderItem);
    }

    @Override
    @Transactional
    public BigDecimal updateOrderItemProductQuantity(Long itemId, final int newOrderItemQuantity) {
        OrderItem orderItem = get(itemId);
        final int quantityDelta = newOrderItemQuantity - orderItem.getProductQuantity();
        orderItem.setProductQuantity(newOrderItemQuantity);
        orderItemRepository.save(orderItem);

        if (isWithdrawalStatus(orderItem.getOrder().getStatus())) {
            updateProductQuantityInDb(orderItem, quantityDelta);
        }

        return recalculateAndUpdateTotalSum(orderItem);
    }

    private void updateProductQuantityInDb(OrderItem orderItem, int quantityDelta) {
        if (orderItem.getProductVariation() != null) {
            ProductVariation productVariation = orderItem.getProductVariation();
            productVariation.setQuantity(productVariation.getQuantity() - quantityDelta);
            productVariationRepository.save(productVariation);
        } else {
            Product product = orderItem.getProduct();
            product.setQuantity(product.getQuantity() - quantityDelta);
            productRepository.save(product);
        }
    }

    private BigDecimal recalculateAndUpdateTotalSum(OrderItem orderItem) {
        Order order = orderRepository.findOne(orderItem.getOrder().getId());
        BigDecimal totalSum = OrderUtil.calculateTotalSum(order.getOrderItems());
        order.setTotalSum(totalSum);
        orderRepository.save(order);
        return totalSum;
    }

    @Override
    @Transactional
    public BigDecimal updateOrderItemProductPrice(Long itemId, BigDecimal price) {
        OrderItem orderItem = get(itemId);
        orderItem.setProductPrice(price);
        orderItemRepository.save(orderItem);

        return recalculateAndUpdateTotalSum(orderItem);
    }

    @Override
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public OrderItem get(Long id) {
        return orderItemRepository.findOne(id);
    }

    @Override
    @Transactional
    public void delete(Long orderItemId) {
        OrderItem orderItem = get(orderItemId);
        Order order = orderItem.getOrder();

        if (isWithdrawalStatus(order.getStatus())) {
            if (orderItem.getProductVariation() != null) {
                ProductVariation productVariation = orderItem.getProductVariation();
                productVariation.setQuantity(productVariation.getQuantity() + orderItem.getProductQuantity());
                productVariationRepository.save(productVariation);
            } else {
                Product product = orderItem.getProduct();
                product.setQuantity(product.getQuantity() + orderItem.getProductQuantity());
                productRepository.save(product);
            }
        }

        order.getOrderItems().remove(orderItem);
        orderItemRepository.delete(orderItem);
    }

    @Override
    @Transactional
    public OrderItem createNewEmpty(Long orderId) {
        return orderItemRepository.save(new OrderItem(orderRepository.findOne(orderId),
                null, "", new BigDecimal(0), 1));
    }

    @Override
    public List<OrderItemAutocompleteDto> getByProductMask(String productNameMask) {
        List<OrderItemAutocompleteDto> orderItemAutocompleteDtos = new ArrayList<>();
        productRepository.getByNameLike("%" + productNameMask + "%").forEach(product -> {
            if (product.getHasVariations()) {
                for (ProductVariation productVariation : product.getVariations()) {
                    orderItemAutocompleteDtos.add(
                            new OrderItemAutocompleteDto(
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
                orderItemAutocompleteDtos.add(
                        new OrderItemAutocompleteDto(
                                product.getName() + " " + product.getPrice().setScale(0, RoundingMode.HALF_UP),
                                product.getId(),
                                0L,
                                product.getName(),
                                product.getPrice()
                        )
                );
            }
        });
        return orderItemAutocompleteDtos;
    }

}
