package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.OrderItem;

public interface OrderItemService{

    OrderItem save(OrderItem orderItem);

    void  update(OrderItem orderItem);

    OrderItem get(Long id);

    void delete(Long id);

    void updateProductName(Long id, String newProductName);

    int updateOrderItemProductQuantity(Long itemId, int quantity);
    int updateOrderItemProductPrice(Long itemId, int price);

}
