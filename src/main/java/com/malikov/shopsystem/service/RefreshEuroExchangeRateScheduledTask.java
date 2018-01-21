package com.malikov.shopsystem.service;

import com.malikov.shopsystem.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.net.URI;
import java.util.Optional;

import static org.springframework.http.HttpMethod.GET;

/**
 * @author Yurii Malikov
 */
@Component
public class RefreshEuroExchangeRateScheduledTask {

    private static final int EURO_ID = 3;
    private static final int SCALE = 6;
    private static final int TWENTY_MINUTES = 20 * 60 * 1000;
    private static final int THREE_HOURS = 3 * 60 * 60 * 1000;

    private static final String AUCTION_EXCHANGE_RATE_URL =
            "http://api.minfin.com.ua/auction/info/58ec1c89d7ea9221853cf7b777a02c686c455a03/";

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private CurrencyRepository currencyRepository;

    @Transactional
    @Scheduled(fixedDelay = TWENTY_MINUTES, initialDelay = THREE_HOURS)
    public void refreshEuroExchangeRate() {

        Optional.ofNullable(currencyRepository.findOne(BigInteger.valueOf(EURO_ID)))
                .ifPresent(euro -> euro.setCurrencyRate(calcExchangeRate(requestEuroExchangeRate())));
    }

    private BigDecimal requestEuroExchangeRate() {
        try {

            return restTemplate.exchange(URI.create(AUCTION_EXCHANGE_RATE_URL), GET, new HttpEntity<>(headers()),
                    new ParameterizedTypeReference<MinFinResponseDto>() {}).getBody().eur.bid;

        } catch (RestClientException ex) {
            throw new RestClientException("currency server is not available", ex);
        } catch (Exception ex) {
            throw new RuntimeException("refreshing currency rate failed");
        }
    }

    private HttpHeaders headers() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return headers;
    }

    private BigDecimal calcExchangeRate(BigDecimal minFinEuroExchangeRate) {
        return BigDecimal.ONE.divide(minFinEuroExchangeRate, SCALE, RoundingMode.HALF_UP);
    }

    private class MinFinResponseDto {

        CurrencyExchangeInfo eur;

        private class CurrencyExchangeInfo {

            BigDecimal bid;

        }

    }

}
