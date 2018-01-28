package com.malikov.shopsystem.repository.specification;

import com.malikov.shopsystem.dto.OrderFilterDto;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.util.DateTimeUtil;
import org.hibernate.criterion.MatchMode;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import java.time.LocalDateTime;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.springframework.data.jpa.domain.Specifications.where;

public class OrderSpecification {

    private OrderSpecification() {
        // utility class
    }

    public static Specifications orderOfCustomer(OrderFilterDto filter) {

        return nonNull(filter.getCustomerId())
                ? where(customerIdEquals(filter.getCustomerId()))
                : emptySpecification()
                .and(customerFirstNameLike(filter.getCustomerFirstNameMask()))
                .and(customerLastNameLike(filter.getCustomerLastNameMask()))
                .and(customerDestinationCityLike(filter.getDestinationCityMask()))
                .and(customerPhoneNumberLike(filter.getCustomerPhoneMask()));
    }

    public static Specifications<Order> emptySpecification() {
        return where(null);
    }

    private static Specification<Order> customerIdEquals(Long customerId) {
        return (root, query, cb) -> cb.equal(root.get("customerId"), customerId);
    }

    private static Specification<Order> customerFirstNameLike(String customerFirstNameMask) {
        return isNull(customerFirstNameMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("customerFirstName")),
                        MatchMode.ANYWHERE.toMatchString(customerFirstNameMask.trim().toLowerCase()));
    }

    private static Specification<Order> customerLastNameLike(String customerLastNameMask) {
        return isNull(customerLastNameMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("customerLastName")),
                        MatchMode.ANYWHERE.toMatchString(customerLastNameMask.trim().toLowerCase()));
    }

    private static Specification<Order> customerDestinationCityLike(String customerDestinationCityMask) {
        return isNull(customerDestinationCityMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("destinationCity")),
                        MatchMode.ANYWHERE.toMatchString(customerDestinationCityMask.trim().toLowerCase()));
    }

    private static Specification<Order> customerPhoneNumberLike(String customerPhoneMask) {
        return isNull(customerPhoneMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("customerPhoneNumber")),
                        MatchMode.ANYWHERE.toMatchString(customerPhoneMask.trim().toLowerCase()));
    }

    public static Specification<Order> createdBetween(LocalDateTime from, LocalDateTime to) {
        return isNull(from) && isNull(to) ? null : betweenDates(from, to);
    }

    private static Specification<Order> betweenDates(LocalDateTime from, LocalDateTime to) {
        return (root, query, cb) ->
                cb.between(root.get("dateTimeCreated"),
                        isNull(from) ? DateTimeUtil.MIN : from,
                        isNull(to) ? DateTimeUtil.MAX : to);
    }

    public static Specification<Order> containsProduct(OrderFilterDto filter) {

        if (nonNull(filter.getProductVariationId())) {
            return orderContainsProductVariation(filter.getProductVariationId());
        } else if (nonNull(filter.getProductId())) {
            return orderContainsProduct(filter.getProductId());
        } else if (nonNull(filter.getProductNameMask())) {
            return productNameLike(filter.getProductNameMask());
        }
        return null;
    }

    private static Specification<Order> orderContainsProductVariation(Long productVariationId) {
        return (root, query, cb) ->
                cb.equal(root.join("orderLines").join("productVariation").get("id"), productVariationId);
    }

    private static Specification<Order> orderContainsProduct(Long productId) {
        return (root, query, cb) -> cb.equal(root.join("orderLines").join("product").get("id"), productId);
    }

    private static Specification<Order> productNameLike(String productNameMask) {
        return isNull(productNameMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.join("orderLines").get("productName")),
                        MatchMode.ANYWHERE.toMatchString(productNameMask.trim().toLowerCase()));
    }

}
