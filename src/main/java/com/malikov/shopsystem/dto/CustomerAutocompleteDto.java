package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerAutocompleteDto {

    private String label;
    private Long customerId;
    private String customerFirstName;
    private String customerLastName;
    private String customerPhoneNumber;
    private String customerCityName;
    private String customerPostOffice;
    private String customerNote;

}
