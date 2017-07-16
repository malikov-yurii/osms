package com.malikov.shopsystem.service.impl;
import com.malikov.shopsystem.dto.OrderItemAutocompleteDto;
import com.malikov.shopsystem.dto.OrderItemLiteDto;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderItem;
import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.OrderItemRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.service.OrderItemService;
import com.malikov.shopsystem.util.OrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
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
    public void updateProductName(Long id, String newProductName) {
        OrderItem orderItem = get(id);
        orderItem.setProductName(newProductName);
        orderItemRepository.save(orderItem);
    }

    @Override
    public BigDecimal updateOrderItemProductQuantity(Long itemId, int quantity) {
            OrderItem orderItem = get(itemId);
            orderItem.setProductQuantity(quantity);
        return recalculateTotalSum(orderItem);
    }

    private BigDecimal recalculateTotalSum(OrderItem orderItem) {
        Order order = orderItem.getOrder();
        BigDecimal totalSum = OrderUtil.calculateTotalSum(order.getOrderItems());
        order.setTotalSum(totalSum);
        orderRepository.save(order);
        orderItemRepository.save(orderItem);
        return totalSum;
    }

    @Override
    public BigDecimal updateOrderItemProductPrice(Long itemId, BigDecimal price) {
            OrderItem orderItem = get(itemId);
            orderItem.setProductPrice(price);
        return recalculateTotalSum(orderItem);
    }

    @Override
    public OrderItem get(Long id) {
        return orderItemRepository.findOne(id);
    }

    @Override
    public void delete(Long id) {
        orderItemRepository.delete(id);
    }

    @Override
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
                                            + productVariation.getVariationValue().getName()
                                            + " " + productVariation.getPrice(),
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
/*
    @Override
    public List<OrderItemDto> getPage(int pageNumber, int pageCapacity) {
        return orderItemRepository.findAll(new PageRequest(pageNumber, pageCapacity))
                .getContent()
                .stream()
                .map(OrderItemU);
    }*/
}
