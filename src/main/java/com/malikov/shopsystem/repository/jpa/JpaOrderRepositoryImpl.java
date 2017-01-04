package com.malikov.shopsystem.repository.jpa;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.repository.OrderRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;

public class JpaOrderRepositoryImpl implements OrderRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    public Order save(Order order) {
        if (order.isNew()) {
            em.persist(order);
            return order;
        } else {
            return em.merge(order);
        }
    }

    @Override
    @Transactional
    public boolean delete(int id) {
        return em.createNamedQuery(Order.DELETE).setParameter("id", id).executeUpdate() != 0;
    }

    @Override
    public Order get(int id) {
        return em.find(Order.class, id);
    }

    @Override
    public Collection<Order> getAll() {
        return em.createNamedQuery(Order.ALL_SORTED, Order.class).getResultList();
    }

    @Override
    public Collection<Order> getByCustomerId(int customerId) {
        return em.createNamedQuery(Order.BY_CUSTOMER_ID, Order.class)
                .setParameter("customerId", customerId).getResultList();
    }

    @Override
    public Collection<Order> getByProductId(int productId) {
        return em.createNamedQuery(Order.BY_PRODUCT_ID, Order.class)
                .setParameter("productId", productId).getResultList();
    }
}
