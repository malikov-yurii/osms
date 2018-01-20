package com.malikov.shopsystem.service;

import com.malikov.shopsystem.dto.OrderLineDto;
import com.malikov.shopsystem.dto.ProductAutocompleteDto;
import com.malikov.shopsystem.mapper.ProductMapper;
import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderLine;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.OrderLineRepository;
import com.malikov.shopsystem.repository.OrderRepository;
import com.malikov.shopsystem.repository.ProductRepository;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.function.BiFunction;

import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductPrice;
import static com.malikov.shopsystem.util.CalculateProductPriceUtil.calculateProductVariationPrice;
import static java.math.BigDecimal.valueOf;
import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;

@Service
public class OrderLineService {

    private static final int DEFAULT_NEW_PRODUCT_QUANTITY = 1;

    @Autowired
    private OrderLineRepository orderLineRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductVariationRepository productVariationRepository;
    @Autowired
    private UpdateStockService updateStockService;
    @Autowired
    private ProductMapper productMapper;

    public OrderLine get(Long id) {
        return orderLineRepository.findOne(id);
    }

    public List<ProductAutocompleteDto> getByProductMask(String productNameMask) {

        return productRepository.getByNameLike(atAnyPositionIgnoreCommas(productNameMask)).stream()
                .map(this::toAutocompleteDto)
                .flatMap(Collection::stream)
                .collect(toList());
    }

    public Collection<ProductAutocompleteDto> toAutocompleteDto(Product product) {

        return product.getHasVariations()
                ? productMapper.toAutocompleteDto(product.getVariations())
                : productMapper.toAutocompleteDtoSingleton(product);
    }

    private String atAnyPositionIgnoreCommas(String mask) {
        return "%" + mask.replaceAll(",", "") + "%";
    }

    @Transactional
    public OrderLine create(Long orderId) {

        OrderLine orderLine = new OrderLine();
        orderLine.setOrder(orderRepository.findOne(orderId));

        return orderLineRepository.save(orderLine);
    }

    @Transactional
    public void update(OrderLineDto orderLineDto) {

        OrderLine orderLine = get(orderLineDto.getOrderItemId());

        boolean isProductNameUpdated = updateOrderLineProductName(orderLineDto, orderLine);

        boolean orderTotalSumChanged = setProductToOrderLine(orderLineDto, orderLine);
        orderTotalSumChanged |= updateOrderLineProductPrice(orderLineDto, orderLine);
        orderTotalSumChanged |= updateOrderLineProductQuantity(orderLineDto, orderLine);
        if (orderTotalSumChanged) {
            Order order = orderLine.getOrder();
            order.setTotalSum(calcTotalSum(order));
        }

        boolean orderLineChanged = isProductNameUpdated || orderTotalSumChanged;
        if (orderLineChanged) {
            orderLineRepository.save(orderLine);
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
        ProductVariation productVariation = productVariationRepository.findOne(orderLineDto.getProductVariationId());
        setProductVariationToOrderLine(orderLine, productVariation);
        orderLine.setProductQuantity(DEFAULT_NEW_PRODUCT_QUANTITY);

        return true;
    }

    private boolean setProduct(OrderLineDto orderLineDto, OrderLine orderLine) {

        if (orderLineDto.getProductId() == null) {
            return false;
        }

        updateStockService.returnToStock(orderLine);
        setProductToOrderLine(orderLine, productRepository.findOne(orderLineDto.getProductId()));
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
        orderLine.setProductPrice(calculateProductPrice(product));
    }

    private void setProductVariationToOrderLine(OrderLine orderLine, ProductVariation productVariation) {

        orderLine.setProduct(productVariation.getProduct());
        orderLine.setProductVariation(productVariation);
        orderLine.setProductName(orderLineProductName(productVariation));
        orderLine.setProductPrice(calculateProductVariationPrice(productVariation));

        decreaseStockForProductJustBeenSet(orderLine);
    }

    private String orderLineProductName(ProductVariation productVariation) {
        return productVariation.getProduct().getName() + " " + productVariation.getVariationValue().getName();
    }

    private boolean updateOrderLineProductName(OrderLineDto orderLineDto, OrderLine orderLine) {

        if (orderLineDto.getName() == null) {
            return false;
        }

        orderLine.setProductName(orderLineDto.getName());

        return true;
    }

    private boolean updateOrderLineProductPrice(OrderLineDto orderLineDto, OrderLine orderLine) {

        if (orderLineDto.getPrice() == null) {
            return false;
        }

        orderLine.setProductPrice(orderLineDto.getPrice());

        return true;
    }

    private boolean updateOrderLineProductQuantity(OrderLineDto orderLineDto, OrderLine orderLine) {

        if (orderLineDto.getQuantity() == null) {
            return false;
        }

        updateStockService.updateStock(orderLine, orderLine.getProductQuantity() - orderLineDto.getQuantity());
        orderLine.setProductQuantity(orderLineDto.getQuantity());

        orderLineRepository.save(orderLine);

        return true;
    }

    private BigDecimal calcTotalSum(Order order) {
        return order.getOrderLines().stream().reduce(BigDecimal.ZERO, calcAndAddOrderLineTotal(), BigDecimal::add);
    }

    private BiFunction<BigDecimal, OrderLine, BigDecimal> calcAndAddOrderLineTotal() {
        return (sum, ordLine) -> sum.add(ordLine.getProductPrice().multiply(valueOf(ordLine.getProductQuantity())));
    }

    @Transactional
    public void delete(Long orderLineId) {

        OrderLine orderLine = get(orderLineId);

        updateStockService.returnToStock(orderLine);

        Order order = orderLine.getOrder();
        order.getOrderLines().remove(orderLine);
        order.setTotalSum(calcTotalSum(order));

        orderLineRepository.delete(orderLine);
    }

}
