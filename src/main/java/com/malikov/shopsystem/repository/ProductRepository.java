package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.domain.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    @Query(value = "SELECT * FROM jos_jshopping_products " +
            "WHERE replace(`name_ru-RU`, ',', '') LIKE ?1", nativeQuery = true)
    List<Product> getByNameLike(String productNameMask);

}
