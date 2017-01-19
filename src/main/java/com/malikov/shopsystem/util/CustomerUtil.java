package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Customer;
import com.malikov.shopsystem.to.CustomerTo;

public class CustomerUtil {

    public static Customer createNewFromTo(CustomerTo customerTo) {
        return new Customer(null, customerTo.getFirstName(), customerTo.getLastName(), customerTo.getPhone(),
                customerTo.getCity(), customerTo.getNovaPoshta(), customerTo.getEmail());
    }

    public static CustomerTo asTo(Customer customer){
        return new CustomerTo(customer.getId(), customer.getName(), customer.getLastName(),
                customer.getPhoneNumber(), customer.getCity(), customer.getNovaPoshta(), customer.getEmail());
    }

    public static Customer updateFromTo(Customer customer, CustomerTo customerTo) {
        customer.setName(customerTo.getFirstName());
        customer.setLastName(customerTo.getLastName());
        customer.setPhoneNumber(customerTo.getPhone());
        customer.setCity(customerTo.getCity());
        customer.setNovaPoshta(customerTo.getNovaPoshta());
        customer.setEmail(customerTo.getEmail());
        return customer;
    }

}
