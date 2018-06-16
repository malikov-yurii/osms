package com.malikov.shopsystem.repository.specification;

import com.malikov.shopsystem.core.DateTimeUtil;
import com.malikov.shopsystem.domain.Order;
import com.malikov.shopsystem.dto.OrderFilterDto;
import org.hibernate.criterion.MatchMode;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import java.time.LocalDateTime;
import java.util.Objects;

import static org.springframework.data.jpa.domain.Specifications.where;

public class OrderSpecification {

    private OrderSpecification() {
        // utility class
    }

    @SuppressWarnings("unchecked assignments")
    public static Specifications of(OrderFilterDto filter) {

        return initSpecification()
                .and(orderOfCustomer(filter))
                .and(createdBetween(filter.getFromDateTimeCreated(), filter.getToDateTimeCreated()))
                .and(containsProduct(filter));
    }

    private static Specifications orderOfCustomer(OrderFilterDto filter) {

        return Objects.nonNull(filter.getCustomerId())
                ? where(customerIdEquals(filter.getCustomerId()))
                : initSpecification()
                .and(customerFirstNameLike(filter.getCustomerFirstNameMask()))
                .and(customerLastNameLike(filter.getCustomerLastNameMask()))
                .and(destinationCityLike(filter.getDestinationCityMask()))
                .and(customerPhoneNumberLike(filter.getCustomerPhoneMask()));
    }

    private static Specifications<Order> initSpecification() {
        return where(null);
    }

    private static Specification<Order> customerIdEquals(Long customerId) {
        return (root, query, cb) -> cb.equal(root.get("customerId"), customerId);
    }

    private static Specification<Order> customerFirstNameLike(String customerFirstNameMask) {
        return Objects.isNull(customerFirstNameMask) ? null : likeCustomerFirstNameMaskAnywhere(customerFirstNameMask);
    }

    private static Specification<Order> likeCustomerFirstNameMaskAnywhere(String customerFirstNameMask) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.get("customerFirstName")),
                        MatchMode.ANYWHERE.toMatchString(customerFirstNameMask.trim().toLowerCase()));
    }

    private static Specification<Order> customerLastNameLike(String customerLastNameMask) {
        return Objects.isNull(customerLastNameMask) ? null : likeCustomerLastNameMaskAnywhere(customerLastNameMask);
    }

    private static Specification<Order> likeCustomerLastNameMaskAnywhere(String customerLastNameMask) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.get("customerLastName")),
                        MatchMode.ANYWHERE.toMatchString(customerLastNameMask.trim().toLowerCase()));
    }

    private static Specification<Order> destinationCityLike(String destinationCityMask) {
        return Objects.isNull(destinationCityMask) ? null : likeDestinationCityMaskAnywhere(destinationCityMask);
    }

    private static Specification<Order> likeDestinationCityMaskAnywhere(String customerDestinationCityMask) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.get("destinationCity")),
                        MatchMode.ANYWHERE.toMatchString(customerDestinationCityMask.trim().toLowerCase()));
    }

    private static Specification<Order> customerPhoneNumberLike(String customerPhoneMask) {
        return Objects.isNull(customerPhoneMask) ? null : likeCustomerPhoneNumberMaskAnywhere(customerPhoneMask);
    }

    private static Specification<Order> likeCustomerPhoneNumberMaskAnywhere(String customerPhoneMask) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.get("customerPhoneNumber")),
                        MatchMode.ANYWHERE.toMatchString(customerPhoneMask.trim().toLowerCase()));
    }

    private static Specification<Order> createdBetween(LocalDateTime from, LocalDateTime to) {
        return Objects.isNull(from) && Objects.isNull(to) ? null : betweenDates(from, to);
    }

    private static Specification<Order> betweenDates(LocalDateTime from, LocalDateTime to) {
        return (root, query, cb) -> cb.between(root.get("dateTimeCreated"), minDateTimeOr(from), maxDateTimeOr(to));
    }

    private static LocalDateTime minDateTimeOr(LocalDateTime from) {
        return Objects.isNull(from) ? DateTimeUtil.MIN : from;
    }

    private static LocalDateTime maxDateTimeOr(LocalDateTime to) {
        return Objects.isNull(to) ? DateTimeUtil.MAX : to;
    }

    private static Specification<Order> containsProduct(OrderFilterDto filter) {

        if (Objects.nonNull(filter.getProductVariationId())) {
            return orderContainsProductVariation(filter.getProductVariationId());
        } else if (Objects.nonNull(filter.getProductId())) {
            return orderContainsProduct(filter.getProductId());
        } else if (Objects.nonNull(filter.getProductNameMask())) {
            return productNameLike(filter.getProductNameMask());
        }
        return null;
    }

    private static Specification<Order> orderContainsProductVariation(Long productVariationId) {
        return (root, query, cb) -> {
            query.distinct(true);
            return cb.equal(root.join("orderLines").join("productVariation").get("id"), productVariationId);
        };
    }

    private static Specification<Order> orderContainsProduct(Long productId) {
        return (root, query, cb) -> {
            query.distinct(true);
            return cb.equal(root.join("orderLines").join("product").get("id"), productId);
        };
    }

    private static Specification<Order> productNameLike(String productNameMask) {
        return Objects.isNull(productNameMask) ? null : likeProductNameMaskAnywhere(productNameMask);
    }

    private static Specification<Order> likeProductNameMaskAnywhere(String productNameMask) {
        return (root, query, cb) -> {
            query.distinct(true);
            return cb.like(cb.lower(root.join("orderLines").get("productName")),
                    MatchMode.ANYWHERE.toMatchString(productNameMask.trim().toLowerCase()));
        };
    }

}
