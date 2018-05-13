package com.malikov.shopsystem.dto;

import com.malikov.shopsystem.enumtype.CurrencyCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class CurrencyDto {

    CurrencyCode code;
    BigDecimal exchangeRate;
    LocalDateTime lastUpdated;
    LocalDateTime lastAutoUpdateAttempt;

}
