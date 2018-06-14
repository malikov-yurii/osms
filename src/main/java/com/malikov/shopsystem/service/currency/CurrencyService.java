package com.malikov.shopsystem.service.currency;

import com.malikov.shopsystem.core.calculation.ValueCalculator;
import com.malikov.shopsystem.domain.Currency;
import com.malikov.shopsystem.dto.CurrencyDto;
import com.malikov.shopsystem.mapper.CurrencyMapper;
import com.malikov.shopsystem.repository.CurrencyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class CurrencyService {

    private final CurrencyRepository currencyRepository;
    private final CurrencyMapper currencyMapper;

    public CurrencyService(CurrencyRepository currencyRepository,
                           CurrencyMapper currencyMapper) {
        this.currencyRepository = currencyRepository;
        this.currencyMapper = currencyMapper;
    }

    public List<CurrencyDto> getAll() {
        return currencyMapper.toDtos(currencyRepository.findAll());
    }

    public void update(List<CurrencyDto> dtos) {
        dtos.stream().forEach(dto -> {
            Currency currency = currencyRepository.findByCurrencyCode(dto.getCode());
            BigDecimal newExchangeRate = dto.getExchangeRate();
            currency.setCurrencyRate(ValueCalculator.calculateExchangeRate(newExchangeRate));
            currency.setLastUpdated(LocalDateTime.now());
        });
    }

}
