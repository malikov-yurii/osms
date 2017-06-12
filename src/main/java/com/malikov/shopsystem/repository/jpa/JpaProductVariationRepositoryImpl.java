package com.malikov.shopsystem.repository.jpa;

import com.malikov.shopsystem.model.ProductVariation;
import com.malikov.shopsystem.repository.ProductVariationRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


@Repository
@Transactional(readOnly = true)
public class JpaProductVariationRepositoryImpl implements ProductVariationRepository {

    @PersistenceContext
    EntityManager em;

    @Override
    @Transactional
    public ProductVariation save(ProductVariation productVariation) {
        if (productVariation.isNew()) {
            em.persist(productVariation);
            return productVariation;
        } else {
            return em.merge(productVariation);
        }
    }

    @Override
    @Transactional
    public boolean delete(int id) {
        return em.createNamedQuery(ProductVariation.DELETE)
                .setParameter("id", id).executeUpdate() != 0;
    }

    @Override
    public ProductVariation get(int id) {
        return em.find(ProductVariation.class, id);
    }

    @Override
    public List<ProductVariation> getAll() {
        return em.createNamedQuery(ProductVariation.ALL_SORTED, ProductVariation.class)
                .getResultList();
    }

}
