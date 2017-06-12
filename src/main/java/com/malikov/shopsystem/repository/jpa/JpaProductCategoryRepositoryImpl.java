package com.malikov.shopsystem.repository.jpa;

import com.malikov.shopsystem.model.ProductCategory;
import com.malikov.shopsystem.repository.ProductCategoryRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class JpaProductCategoryRepositoryImpl implements ProductCategoryRepository {

    @PersistenceContext
    EntityManager em;

    @Override
    @Transactional
    public ProductCategory save(ProductCategory productCategory) {
        if (productCategory.isNew()) {
            em.persist(productCategory);
            return productCategory;
        } else {
            return em.merge(productCategory);
        }
    }

    @Override
    @Transactional
    public boolean delete(int id) {
        return em.createNamedQuery(ProductCategory.DELETE)
                .setParameter("id", id).executeUpdate() != 0;
    }

    @Override
    public ProductCategory get(int id) {
        return em.find(ProductCategory.class, id);
    }

    @Override
    public List<ProductCategory> getAll() {
        return em.createNamedQuery(ProductCategory.ALL_SORTED, ProductCategory.class)
                .getResultList();
    }

}
