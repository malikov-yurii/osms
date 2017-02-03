package com.malikov.shopsystem.repository.jpa;

import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.repository.CustomerRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class JpaCustomerRepositoryImpl implements CustomerRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    public Customer save(Customer customer) {
        if (customer.isNew()) {
            em.persist(customer);
            return customer;
        } else {
            return em.merge(customer);
        }
    }

    @Override
    @Transactional
    public boolean delete(int id) {
        return em.createNamedQuery(Customer.DELETE).setParameter("id", id).executeUpdate() != 0;
    }

    @Override
    public Customer get(int id) {
        return em.find(Customer.class, id);
    }

    @Override
    public List<Customer> getAll() {
        return em.createNamedQuery(Customer.ALL_SORTED, Customer.class).getResultList();
    }

    @Override
    public List<Customer> getByName(String name) {
        return em.createNamedQuery(Customer.BY_NAME, Customer.class)
                .setParameter("name", name).getResultList();
    }

    @Override
    public List<Customer> getByLastName(String lastName) {
        return em.createNamedQuery(Customer.BY_LAST_NAME, Customer.class)
                .setParameter("lastName", lastName).getResultList();
    }

    @Override
    public List<Customer> getByFirstNameMask(String firstNameMask) {
        return em.createNamedQuery(Customer.BY_FIRST_NAME_MASK, Customer.class)
                .setParameter("firstNameMask", "%" + firstNameMask + "%").getResultList();
    }

    @Override
    public List<Customer> getByLastNameMask(String lastNameMask) {
        return em.createNamedQuery(Customer.BY_LAST_NAME_MASK, Customer.class)
                .setParameter("lastNameMask", "%" + lastNameMask + "%").getResultList();
    }

    @Override
    public List<Customer> getByPhoneNumberMask(String phoneNumberMask) {
        return em.createNamedQuery(Customer.BY_PHONE_NUMBER_MASK, Customer.class)
                .setParameter("phoneNumberMask", "%" + phoneNumberMask + "%").getResultList();
    }

    @Override
    public List<Customer> getByCityMask(String cityMask) {
        return em.createNamedQuery(Customer.BY_CITY_MASK, Customer.class)
                .setParameter("cityMask", "%" + cityMask + "%").getResultList();
    }

    @Override
    public List<Customer> getByCity(String city) {
        return em.createNamedQuery(Customer.BY_CITY, Customer.class)
                .setParameter("city", city).getResultList();
    }

    @Override
    public Customer getByEmail(String email) {
        return em.createNamedQuery(Customer.BY_EMAIL, Customer.class)
                .setParameter("email", email).getSingleResult();
    }

    @Override
    public Customer getByPhoneNumber(String phoneNumber) {
        return em.createNamedQuery(Customer.BY_PHONE_NUMBER, Customer.class)
                .setParameter("phoneNumber", phoneNumber).getSingleResult();
    }


}
