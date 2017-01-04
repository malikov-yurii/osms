package com.malikov.shopsystem.repository.jpa;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.repository.ProductRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;

@Repository
@Transactional(readOnly = true)
public class JpaProductRepositoryImpl implements ProductRepository {

    @PersistenceContext
    EntityManager em;

    @Override
    @Transactional
    public Product save(Product product) {
        if (product.isNew()) {
            em.persist(product);
            return product;
        } else {
            return em.merge(product);
        }
    }

    @Override
    @Transactional
    public boolean delete(int id) {
        return em.createNamedQuery(Product.DELETE)
                .setParameter("id", id).executeUpdate() != 0;
    }

    @Override
    public Product get(int id) {
        return em.find(Product.class, id);
    }

    @Override
    public Collection<Product> getByCategoryId(int categoryId) {
        return em.createNamedQuery(Product.BY_CATEGORY_ID, Product.class)
                .setParameter("categoryId", categoryId).getResultList();
    }

    @Override
    public Collection<Product> getAllQuantityLessThan(int quantity) {
        return em.createNamedQuery(Product.QUANTITY_LESS_THAN, Product.class)
                .setParameter("quantity" , quantity).getResultList();
    }

    @Override
    public Collection<Product> getAll() {
        return em.createNamedQuery(Product.ALL_SORTED, Product.class)
                .getResultList();
    }
}
