package com.malikov.shopsystem.repository.jpa;

import com.malikov.shopsystem.model.Order;
import com.malikov.shopsystem.model.OrderStatus;
import com.malikov.shopsystem.repository.OrderRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class OrderJpaRepositoryImpl implements OrderRepository {

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
    public boolean delete(Long id) {
        return em.createNamedQuery(Order.DELETE).setParameter("id", id).executeUpdate() != 0;
    }

    @Override
    public Order get(Long id) {
        return em.find(Order.class, id);
    }

    @Override
    public List<Order> getAll() {
        return em.createNamedQuery(Order.ALL, Order.class).getResultList();
    }

    @Override
    public Collection<Order> getByCustomerId(Long customerId) {
        return em.createNamedQuery(Order.BY_CUSTOMER_ID, Order.class)
                .setParameter("customerId", customerId).getResultList();
    }

    @Override
    public Collection<Order> getByProductId(Long productId) {
        return em.createNamedQuery(Order.BY_PRODUCT_ID, Order.class)
                .setParameter("productId", productId).getResultList();
    }

    @Override
    public void updateStatus(Integer orderId, OrderStatus status) {
        em.createNamedQuery(Order.UPDATE_STATUS)
                .setParameter("orderId", orderId)
                .setParameter("status", status)
                .executeUpdate();
    }

    @Override
    public List<Order> getDatatablePage(int start, int length) {
        return em.createNamedQuery(Order.ALL, Order.class)
                .setFirstResult(start)
                .setMaxResults(length)
                .getResultList();
    }

    @Override
    public Long getTotalQuantity() {
        return (Long) em.createNamedQuery(Order.GET_TOTAL_QUANTITY).getSingleResult();
    }

}
