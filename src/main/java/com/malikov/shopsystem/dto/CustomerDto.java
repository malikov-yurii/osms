package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class CustomerDto implements Serializable {

    private Long customerId;
    private String customerFirstName;
    private String customerLastName;
    private String customerPhoneNumber;
    private String customerCityName;
    private String customerPostOffice;
    private String customerEmail;
    private String customerNote;

}
