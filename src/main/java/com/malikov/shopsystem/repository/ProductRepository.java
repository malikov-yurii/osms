package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.id=:categoryId")
    Collection<Product> getByCategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Product p WHERE p.quantity < :quantity")
    Collection<Product> getAllQuantityLessThan(@Param("quantity") int quantity);

    List<Product> getByNameLike(String productNameMask);

}
