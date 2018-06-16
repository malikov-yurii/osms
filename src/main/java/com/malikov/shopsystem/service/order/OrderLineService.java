package com.malikov.shopsystem.service.order;

import com.malikov.shopsystem.core.calculation.ValueCalculator;
import com.malikov.shopsystem.core.strategy.collection.AddOrderLineStrategy;
import com.malikov.shopsystem.core.strategy.collection.DeleteOrderLineStrategy;
import com.malikov.shopsystem.core.strategy.collection.UpdateOrderLineStrategy;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.domain.OrderLine;
import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductVariation;
import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.error.exception.NotFoundException;
import com.malikov.shopsystem.mapper.OrderLineMapper;
import com.malikov.shopsystem.repository.OrderLineRepository;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import com.malikov.shopsystem.service.UpdateStockService;
import com.malikov.shopsystem.service.order.cache.RefreshLastOrdersCacheService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class OrderLineService {

    private static final int DEFAULT_NEW_PRODUCT_QUANTITY = 1;

    private final OrderLineRepository orderLineRepository;
    private final ProductRepository productRepository;
    private final ProductVariationRepository productVariationRepository;
    private final UpdateStockService updateStockService;
    private final OrderLineMapper orderLineMapper;
    private final RefreshLastOrdersCacheService orderCacheService;

    public OrderLineService(OrderLineRepository orderLineRepository, ProductRepository productRepository,
                            ProductVariationRepository productVariationRepository,
                            UpdateStockService updateStockService, OrderLineMapper orderLineMapper,
                            RefreshLastOrdersCacheService orderCacheService) {
        this.orderLineRepository = orderLineRepository;
        this.productRepository = productRepository;
        this.productVariationRepository = productVariationRepository;
        this.updateStockService = updateStockService;
        this.orderLineMapper = orderLineMapper;
        this.orderCacheService = orderCacheService;
    }

    @Transactional
    public OrderLineDto create(Long orderId) {
        OrderLine orderLine = new OrderLine();
        orderLine.setOrderId(orderId);
        OrderLineDto orderLineDto = orderLineMapper.toDto(orderLineRepository.save(orderLine));
        orderCacheService.updateLastOrdersCache(orderLineDto, AddOrderLineStrategy.INSTANCE);
        return orderLineDto;
    }

    @Transactional
    public void delete(Long orderLineId) {
        OrderLine orderLine = get(orderLineId);

        updateStockService.returnToStock(orderLine);

        Order order = orderLine.getOrder();
        order.getOrderLines().remove(orderLine);
        order.setTotalValue(ValueCalculator.calculate(order));

        orderLineRepository.delete(orderLine);
        OrderLineDto orderLineDto = orderLineMapper.toDto(orderLine);
        orderCacheService.updateLastOrdersCache(orderLineDto, DeleteOrderLineStrategy.INSTANCE);
    }

    private OrderLine get(Long orderLineId) {
        return orderLineRepository.findById(orderLineId)
                .orElseThrow(() -> new NotFoundException(OrderLine.class, orderLineId));
    }

    @Transactional
    public void update(OrderLineDto orderLineDto) {
        OrderLine orderLine = get(orderLineDto.getOrderLineId());

        boolean isProductNameUpdated = updateOrderLineProductName(orderLineDto, orderLine);

        boolean orderTotalValueChanged = setProductToOrderLine(orderLineDto, orderLine);
        orderTotalValueChanged |= updateOrderLineProductPrice(orderLineDto, orderLine);
        orderTotalValueChanged |= updateOrderLineProductQuantity(orderLineDto, orderLine);
        if (orderTotalValueChanged) {
            Order order = orderLine.getOrder();
            order.setTotalValue(ValueCalculator.calculate(order));
        }

        boolean orderLineChanged = isProductNameUpdated || orderTotalValueChanged;
        if (orderLineChanged) {
            OrderLineDto updatedOrderLineDto = orderLineMapper.toDto(orderLineRepository.save(orderLine));
            orderCacheService.updateLastOrdersCache(updatedOrderLineDto, UpdateOrderLineStrategy.INSTANCE);
        }
    }

    private boolean setProductToOrderLine(OrderLineDto orderLineDto, OrderLine orderLine) {
        return setProductVariation(orderLineDto, orderLine) || setProduct(orderLineDto, orderLine);
    }

    private boolean setProductVariation(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (Objects.isNull(orderLineDto.getProductVariationId())) {
            return false;
        }

        updateStockService.returnToStock(orderLine);
        ProductVariation productVariation = productVariationRepository
                .findById(orderLineDto.getProductVariationId()).orElse(null);
        setProductVariationToOrderLine(orderLine, productVariation);
        orderLine.setProductQuantity(DEFAULT_NEW_PRODUCT_QUANTITY);

        return true;
    }

    private boolean setProduct(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (orderLineDto.getProductId() == null) {
            return false;
        }

        updateStockService.returnToStock(orderLine);
        setProductToOrderLine(orderLine, productRepository.findById(orderLineDto.getProductId()).orElse(null));
        decreaseStockForProductJustBeenSet(orderLine);
        orderLine.setProductQuantity(DEFAULT_NEW_PRODUCT_QUANTITY);

        return true;
    }

    private void decreaseStockForProductJustBeenSet(OrderLine orderLine) {
        updateStockService.decreaseStock(orderLine, DEFAULT_NEW_PRODUCT_QUANTITY);
    }

    private void setProductToOrderLine(OrderLine orderLine, Product product) {
        orderLine.setProduct(product);
        orderLine.setProductName(product.getName());
        orderLine.setProductPrice(ValueCalculator.calculate(product));
    }

    private void setProductVariationToOrderLine(OrderLine orderLine, ProductVariation productVariation) {
        orderLine.setProduct(productVariation.getProduct());
        orderLine.setProductVariation(productVariation);
        orderLine.setProductName(orderLineProductName(productVariation));
        orderLine.setProductPrice(ValueCalculator.calculate(productVariation));

        decreaseStockForProductJustBeenSet(orderLine);
    }

    private String orderLineProductName(ProductVariation variation) {
        return variation.getProduct().getName() + StringUtils.SPACE + variation.getVariationValue().getName();
    }

    private boolean updateOrderLineProductName(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (Objects.isNull(orderLineDto.getOrderLineProductName())) {
            return false;
        }

        orderLine.setProductName(orderLineDto.getOrderLineProductName());

        return true;
    }

    private boolean updateOrderLineProductPrice(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (Objects.isNull(orderLineDto.getOrderLineProductPrice())) {
            return false;
        }

        orderLine.setProductPrice(orderLineDto.getOrderLineProductPrice());

        return true;
    }

    private boolean updateOrderLineProductQuantity(OrderLineDto orderLineDto, OrderLine orderLine) {
        if (Objects.isNull(orderLineDto.getOrderLineProductQuantity() )) {
            return false;
        }

        int productQuantityDelta = orderLine.getProductQuantity() - orderLineDto.getOrderLineProductQuantity();
        updateStockService.updateStock(orderLine, productQuantityDelta);
        orderLine.setProductQuantity(orderLineDto.getOrderLineProductQuantity());

        orderLineRepository.save(orderLine);

        return true;
    }

}
