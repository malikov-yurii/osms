package com.malikov.shopsystem.service.ordering;

import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.domain.OrderLine;
import com.malikov.shopsystem.domain.Product;
import com.malikov.shopsystem.domain.ProductVariation;
import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.error.exception.NotFoundException;
import com.malikov.shopsystem.mapper.OrderLineMapper;
import com.malikov.shopsystem.mapper.ProductMapper;
import com.malikov.shopsystem.repository.OrderLineRepository;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import com.malikov.shopsystem.core.strategy.collection.AddOrderLineStrategy;
import com.malikov.shopsystem.core.strategy.collection.DeleteOrderLineStrategy;
import com.malikov.shopsystem.service.UpdateStockService;
import com.malikov.shopsystem.service.caching.RefreshLastOrdersCacheService;
import com.malikov.shopsystem.core.strategy.collection.UpdateOrderLineStrategy;
import com.malikov.shopsystem.core.calculation.ValueCalculator;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

import static com.malikov.shopsystem.core.calculation.ValueCalculator.calculate;
import static com.malikov.shopsystem.core.calculation.ValueCalculator.calculate;
import static java.math.BigDecimal.valueOf;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toList;

@Service
public class OrderLineService {

    private static final int DEFAULT_NEW_PRODUCT_QUANTITY = 1;
    private static final String ANY_CHAR_SEQUENCE = "%";

    private final OrderLineRepository orderLineRepository;
    private final OrderService orderService;
    private final ProductRepository productRepository;
    private final ProductVariationRepository productVariationRepository;
    private final UpdateStockService updateStockService;
    private final ProductMapper productMapper;
    private final OrderLineMapper orderLineMapper;
    private final RefreshLastOrdersCacheService orderCacheService;

    public OrderLineService(OrderLineRepository orderLineRepository, OrderService orderService,
                            ProductRepository productRepository, ProductVariationRepository productVariationRepository,
                            UpdateStockService updateStockService, ProductMapper productMapper,
                            OrderLineMapper orderLineMapper, RefreshLastOrdersCacheService orderCacheService) {
        this.orderLineRepository = orderLineRepository;
        this.orderService = orderService;
        this.productRepository = productRepository;
        this.productVariationRepository = productVariationRepository;
        this.updateStockService = updateStockService;
        this.productMapper = productMapper;
        this.orderLineMapper = orderLineMapper;
        this.orderCacheService = orderCacheService;
    }

    public List<ProductAutocompleteDto> getByProductMask(String productNameMask) {

        return productRepository.getByNameLike(atAnyPositionIgnoreCommas(productNameMask)).stream()
                .map(this::toAutocompleteDto)
                .flatMap(Collection::stream)
                .collect(toList());
    }

    private Collection<ProductAutocompleteDto> toAutocompleteDto(Product product) {

        return CollectionUtils.isNotEmpty(product.getVariations())
                ? productMapper.toAutocompleteDto(product.getVariations())
                : productMapper.toAutocompleteDtoSingleton(product);
    }

    private String atAnyPositionIgnoreCommas(String mask) {
        return ANY_CHAR_SEQUENCE + removeCommas(mask) + ANY_CHAR_SEQUENCE;
    }

    private String removeCommas(String mask) {
        return nonNull(mask) ? mask.replaceAll(",", StringUtils.EMPTY) : StringUtils.EMPTY;
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
        if (isNull(orderLineDto.getProductVariationId())) {
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
        orderLine.setProductPrice(calculate(productVariation));

        decreaseStockForProductJustBeenSet(orderLine);
    }

    private String orderLineProductName(ProductVariation variation) {
        return variation.getProduct().getName() + StringUtils.SPACE + variation.getVariationValue().getName();
    }

    private boolean updateOrderLineProductName(OrderLineDto orderLineDto, OrderLine orderLine) {

        if (isNull(orderLineDto.getOrderLineProductName())) {
            return false;
        }

        orderLine.setProductName(orderLineDto.getOrderLineProductName());

        return true;
    }

    private boolean updateOrderLineProductPrice(OrderLineDto orderLineDto, OrderLine orderLine) {

        if (isNull(orderLineDto.getOrderLineProductPrice())) {
            return false;
        }

        orderLine.setProductPrice(orderLineDto.getOrderLineProductPrice());

        return true;
    }

    private boolean updateOrderLineProductQuantity(OrderLineDto orderLineDto, OrderLine orderLine) {

        if (isNull(orderLineDto.getOrderLineProductQuantity() )) {
            return false;
        }

        updateStockService.updateStock(orderLine, orderLine.getProductQuantity() - orderLineDto.getOrderLineProductQuantity());
        orderLine.setProductQuantity(orderLineDto.getOrderLineProductQuantity());

        orderLineRepository.save(orderLine);

        return true;
    }

}
