package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class OrderFilterDto {

    private Long customerId;
    private String customerFirstNameMask;
    private String customerLastNameMask;
    private String destinationCityMask;
    private String customerPhoneMask;
    private Long productId;
    private Long productVariationId;
    private String productNameMask;
    private LocalDateTime fromDateTimeCreated;
    private LocalDateTime toDateTimeCreated;

}
