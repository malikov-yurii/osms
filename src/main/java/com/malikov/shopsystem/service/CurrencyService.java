package com.malikov.shopsystem.service;

import com.malikov.shopsystem.domain.Currency;
import com.malikov.shopsystem.dto.CurrencyDto;
import com.malikov.shopsystem.enumtype.CurrencyCode;
import com.malikov.shopsystem.exception.NotSupportedCurrencyException;
import com.malikov.shopsystem.mapper.CurrencyMapper;
import com.malikov.shopsystem.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpMethod.GET;

@Service
public class CurrencyService {

    private static final int SCALE = 6;
    private static final String AUCTION_EXCHANGE_RATE_URL =
            "http://api.minfin.com.ua/auction/info/58ec1c89d7ea9221853cf7b777a02c686c455a03/";

    private RestTemplate restTemplate;
    private CurrencyRepository currencyRepository;
    private CurrencyMapper currencyMapper;

    @Autowired
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
        return currencyMapper.toDtos(getUpdatedCurrencies());
    }

    @Transactional
    public List<Currency> getUpdatedCurrencies() {
        Currency euro = getCurrency(CurrencyCode.EUR);
        BigDecimal newEuroExchangeRate = requestEuroExchangeRate();
        setExchangeRate(euro, newEuroExchangeRate);
        return Collections.singletonList(euro);
    }

    private BigDecimal requestEuroExchangeRate() {
        try {
            return restTemplate.exchange(URI.create(AUCTION_EXCHANGE_RATE_URL), GET, new HttpEntity<>(headers()),
                    new ParameterizedTypeReference<MinFinResponseDto>() {

                    }).getBody().eur.bid;

        } catch (RestClientException ex) {
            throw new RestClientException("currency server is not available", ex);
        } catch (Exception ex) {
            throw new RuntimeException("refreshing currency rate failed");
        }
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
        getUpdatedCurrencies().stream().peek(currency -> currency.setLastAutoUpdated(LocalDateTime.now()));
    }

    private HttpHeaders headers() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    private class MinFinResponseDto {

        CurrencyExchangeInfo eur;

        private class CurrencyExchangeInfo {

            BigDecimal bid;

        }

    }

}
