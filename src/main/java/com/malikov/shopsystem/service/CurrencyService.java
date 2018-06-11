package com.malikov.shopsystem.service;

import com.malikov.shopsystem.domain.Currency;
import com.malikov.shopsystem.dto.CurrencyDto;
import com.malikov.shopsystem.dto.minfin.MinFinResponseDto;
import com.malikov.shopsystem.enumtype.CurrencyCode;
import com.malikov.shopsystem.exception.NotSupportedCurrencyException;
import com.malikov.shopsystem.mapper.CurrencyMapper;
import com.malikov.shopsystem.repository.CurrencyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CurrencyService {

    private static final int SCALE = 6;
    private static final String AUCTION_EXCHANGE_RATE_URL =
            "http://api.minfin.com.ua/auction/info/58ec1c89d7ea9221853cf7b777a02c686c455a03/";

    private final RestTemplate restTemplate;
    private final CurrencyRepository currencyRepository;
    private final CurrencyMapper currencyMapper;

    public CurrencyService(RestTemplate restTemplate,
                           CurrencyRepository currencyRepository,
                           CurrencyMapper currencyMapper) {
        this.restTemplate = restTemplate;
        this.currencyRepository = currencyRepository;
        this.currencyMapper = currencyMapper;
    }

    public List<CurrencyDto> get() {
        CurrencyDto euro = currencyMapper.toDto(getCurrency(CurrencyCode.EUR));
        return Collections.singletonList(euro);
    }

    private Currency getCurrency(CurrencyCode currencyCode) {
        return Optional.ofNullable(currencyRepository.findByCurrencyCode(currencyCode))
                .orElseThrow(() -> new NotSupportedCurrencyException());
    }

    @Transactional
    public List<CurrencyDto> getUpdated() {
        String ss = "asdf";
        String s123asdf4s = "asdf";
        return currencyMapper.toDtos(getUpdatedCurrencies());
    }

    private List<Currency> getUpdatedCurrencies() {
        Currency euro = getCurrency(CurrencyCode.EUR);
        Optional.ofNullable(requestEuroExchangeRate())
            .ifPresent(newEuroExchangeRate -> setExchangeRate(euro, newEuroExchangeRate));
        return Collections.singletonList(euro);
    }

    private BigDecimal requestEuroExchangeRate() {
        BigDecimal result = null;
        try {
            MinFinResponseDto responseBody =
                    restTemplate.getForEntity(URI.create(AUCTION_EXCHANGE_RATE_URL), MinFinResponseDto.class).getBody();
            result = responseBody.getEur().getBid();
        } catch (Exception ex) {
            log.error("Refreshing currency rate failed.");
        }
        return result;
    }

    public void setExchangeRate(Currency euro, BigDecimal newEuroExchangeRate) {
        BigDecimal currencyRate = calcExchangeRate(newEuroExchangeRate);
        euro.setCurrencyRate(currencyRate);
        euro.setLastUpdated(LocalDateTime.now());
    }

    private BigDecimal calcExchangeRate(BigDecimal minFinEuroExchangeRate) {
        return BigDecimal.ONE.divide(minFinEuroExchangeRate, SCALE, RoundingMode.HALF_UP);
    }

    @Transactional
    public void update(List<CurrencyDto> dtos) {
        dtos.stream().forEach(dto -> {
            Currency currency = getCurrency(dto.getCode());
            BigDecimal newExchangeRate = dto.getExchangeRate();
            setExchangeRate(currency, newExchangeRate);
        });
    }

    @Transactional
    public void scheduledCurrenciesUpdate() {
        for (Currency currency : getUpdatedCurrencies()) {
            LocalDateTime now = LocalDateTime.now();
            currency.setLastUpdated(now);
            currency.setLastAutoUpdateAttempt(now);
        }
    }

}
