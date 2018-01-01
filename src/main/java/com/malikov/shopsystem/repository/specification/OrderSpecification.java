package com.malikov.shopsystem.repository.specification;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.model.ProductVariation;
import org.hibernate.criterion.MatchMode;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import java.time.LocalDateTime;

import static java.util.Objects.isNull;

/**
 * @author Yurii Malikov
 */
public class OrderSpecification {

    private OrderSpecification() {
        // utility class
    }

    public static Specification<Order> customerIdEquals(Long customerId) {
        return (root, query, cb) -> cb.equal(root.get("customerId"), customerId);
    }

    public static Specification<Order> customerFirstNameLike(String customerFirstNameMask) {
        return isNull(customerFirstNameMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("customerFirstName")),
                        MatchMode.ANYWHERE.toMatchString(customerFirstNameMask.trim().toLowerCase()));
    }

    public static Specification<Order> customerLastNameLike(String customerLastNameMask) {
        return isNull(customerLastNameMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("customerLastName")),
                        MatchMode.ANYWHERE.toMatchString(customerLastNameMask.trim().toLowerCase()));
    }

    public static Specification<Order> customerDestinationCityLike(String customerDestinationCityMask) {
        return isNull(customerDestinationCityMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("destinationCity")),
                        MatchMode.ANYWHERE.toMatchString(customerDestinationCityMask.trim().toLowerCase()));
    }

    public static Specification<Order> customerPhoneLike(String customerPhoneMask) {
        return isNull(customerPhoneMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("customerPhoneNumber")),
                        MatchMode.ANYWHERE.toMatchString(customerPhoneMask.trim().toLowerCase()));
    }

    public static Specification<Order> productNameLike(String productNameMask) {
        return isNull(productNameMask)
                ? null
                : (root, query, cb) ->
                cb.like(cb.lower(root.get("orderItems").get("productName")),
                        MatchMode.ANYWHERE.toMatchString(productNameMask.trim().toLowerCase()));
    }

    public static Specification<Order> createdBetween(LocalDateTime from, LocalDateTime to) {
        return isNull(from) && isNull(to) ? null : betweenDates(from, to);
    }

    private static Specification<Order> betweenDates(LocalDateTime from, LocalDateTime to) {
        return (root, query, cb) ->
                cb.between(root.get("dateTimeCreated"),
                        isNull(from) ? LocalDateTime.MIN : from,
                        isNull(to) ? LocalDateTime.MAX : to);
    }

    public static Specification<Order> orderContainsProduct(Product product) {
        return (root, query, cb) -> cb.equal(root.get("orderItems").get("product").get("id"), product.getId());
    }

    public static Specification<Order> orderContainsProductVariation(ProductVariation productVariation) {
        return (root, query, cb) ->
                cb.equal(root.get("orderItems").get("productVariation").get("id"), productVariation.getId());
    }

    public static Specifications<Order> emptySpecification() {
        return Specifications.where(null);
    }

}
