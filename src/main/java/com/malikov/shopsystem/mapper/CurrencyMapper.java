package com.malikov.shopsystem.mapper;

import com.malikov.shopsystem.domain.Currency;
import com.malikov.shopsystem.dto.CurrencyDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Mapper
public interface CurrencyMapper {

    int SCALE = 6;

    @Mapping(source = "currencyCode", target = "code")
    CurrencyDto toDto(Currency source);

    List<CurrencyDto> toDtos(List<Currency> source);

    @AfterMapping
    default void afterToDto(Currency source, @MappingTarget CurrencyDto target) {
        target.setExchangeRate(BigDecimal.ONE.divide(source.getCurrencyRate(), SCALE, RoundingMode.HALF_UP));
    }

}
