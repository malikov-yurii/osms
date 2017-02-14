package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.to.CustomerTo;

public class CustomerUtil {

    public static Customer createNewFromTo(CustomerTo customerTo) {
        return new Customer(null, customerTo.getName(), customerTo.getLastName(), customerTo.getPhoneNumber(),
                customerTo.getCity(), customerTo.getPostOffice(), customerTo.getEmail(), customerTo.getNote());
    }

    public static CustomerTo asTo(Customer customer){
        return new CustomerTo(customer.getId(), customer.getName(), customer.getLastName(),
                customer.getPhoneNumber(), customer.getCity(), customer.getPostOffice(), customer.getEmail(), customer.getNote());
    }

    public static Customer updateFromTo(Customer customer, CustomerTo customerTo) {
        customer.setName(customerTo.getName());
        customer.setLastName(customerTo.getLastName());
        customer.setPhoneNumber(customerTo.getPhoneNumber());
        customer.setCity(customerTo.getCity());
        customer.setPostOffice(customerTo.getPostOffice());
        customer.setEmail(customerTo.getEmail());
        customer.setNote(customerTo.getNote());
        return customer;
    }

}
