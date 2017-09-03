package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.model.Order;
import org.springframework.data.domain.Page;

public interface OrderService {

    Order createEmpty();

    Order save(OrderDto orderDto);

    void update(OrderDto orderDto);

    Order get(Long id);

    void delete(Long id);

    Page<OrderDto> getPage(int pageNumber, int pageCapacity);

    Page<OrderDto> getFilteredPage(OrderFilterDto orderFilterDto, int pageNumber, int pageCapacity);
}
