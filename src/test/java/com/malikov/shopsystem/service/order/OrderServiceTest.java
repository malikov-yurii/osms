package com.malikov.shopsystem.service.order;

import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.domain.User;
import com.malikov.shopsystem.dto.OrderDto;
import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.enumtype.OrderStatus;
import com.malikov.shopsystem.enumtype.PaymentType;
import com.malikov.shopsystem.mapper.OrderLineMapper;
import com.malikov.shopsystem.mapper.OrderMapper;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.service.security.AuthorizedUserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mapstruct.factory.Mappers;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class OrderServiceTest {

    private static final long ORDER_ID = 222L;

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private AuthorizedUserService authorizedUserService;
    @Spy
    private OrderLineMapper orderLineMapper = Mappers.getMapper(OrderLineMapper.class);
    @Spy @InjectMocks
    private OrderMapper orderMapper = Mappers.getMapper(OrderMapper.class);

    @InjectMocks
    private OrderService testing;

    @Captor
    private ArgumentCaptor<Order> orderArgumentCaptor;

    private Order order;

    @Before
    public void setUp() {
        when(orderRepository.save(any(Order.class)))
                .thenAnswer(invocation -> {
                    order = (Order) invocation.getArguments()[0];
                    order.setId(ORDER_ID);
                    return order;
                });
    }

    @Test
    public void shouldSetPaymentTypeWhenCreateOrder() {
        OrderDto actualOrder = testing.create();

        assertThat(actualOrder.getPaymentType()).isEqualTo(PaymentType.NP);
    }

    @Test
    public void shouldSetOrderStatusWhenCreateOrder() {
        OrderDto actualOrder = testing.create();

        assertThat(actualOrder.getStatus()).isEqualTo(OrderStatus.NEW);
    }

    @Test
    public void shouldCreateOrderLineWhenCreateOrder() {
        OrderDto actualOrder = testing.create();

        List<OrderLineDto> orderLines = actualOrder.getOrderLines();
        assertThat(orderLines.size()).isEqualTo(1);
        assertThat(orderLines.get(0).getOrderId()).isEqualTo(ORDER_ID);
    }

    @Test
    public void shouldSetAuthorizedUserToOrderWhenCreateOrder() {
        User authorizesUser = new User();
        when(authorizedUserService.getAuthorizedUser()).thenReturn(authorizesUser);

        testing.create();

        verify(orderRepository).save(orderArgumentCaptor.capture());
        assertThat(orderArgumentCaptor.getValue().getUser()).isEqualTo(authorizesUser);
    }

}