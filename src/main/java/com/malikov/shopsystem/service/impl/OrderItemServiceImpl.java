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
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

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
    public void updateProduct(Long itemId, Long productId, Long productVariationId) {
        if (productId == null && productVariationId == null) {
            throw new RuntimeException("presence of productId or productVariationId is mandatory");
        }

        OrderItem orderItem = orderItemRepository.findOne(itemId);

        if (productVariationId != null) {
            ProductVariation productVariation = productVariationRepository.findOne(productVariationId);
            orderItem.setProduct(productVariation.getProduct());
            orderItem.setProductName(productVariation.getProduct().getName() + " "
                    + productVariation.getVariationValue().getName());
            orderItem.setProductPrice(productVariation.getPrice());
        }else {
            Product product = productRepository.findOne(productId);
            orderItem.setProduct(product);
            orderItem.setProductName(product.getName());
            orderItem.setProductPrice(product.getPrice());
        }

        orderItem.setProductQuantity(1);
        orderItemRepository.save(orderItem);
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
    public BigDecimal updateOrderItemProductQuantity(Long itemId, int quantity) {
        OrderItem orderItem = get(itemId);
        orderItem.setProductQuantity(quantity);
        orderItemRepository.save(orderItem);

        return recalculateAndUpdateTotalSum(orderItem);
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
    public OrderItem get(Long id) {
        return orderItemRepository.findOne(id);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        orderItemRepository.delete(id);
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
                                product.getName() + " " + product.getPrice(),
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
