package com.malikov.shopsystem.service.currency;

import com.malikov.shopsystem.core.calculation.ValueCalculator;
import com.malikov.shopsystem.domain.Currency;
import com.malikov.shopsystem.dto.CurrencyDto;
import com.malikov.shopsystem.dto.minfin.MinFinResponseDto;
import com.malikov.shopsystem.enumtype.CurrencyCode;
import com.malikov.shopsystem.error.exception.NotSupportedCurrencyException;
import com.malikov.shopsystem.mapper.CurrencyMapper;
import com.malikov.shopsystem.repository.CurrencyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UpdateCurrencyExchangeRateService {

    private static final String AUCTION_EXCHANGE_RATE_URL =
            "http://api.minfin.com.ua/auction/info/58ec1c89d7ea9221853cf7b777a02c686c455a03/";
    private static final int TWENTY_MINUTES = 20 * 60 * 1000;
    private static final int THREE_HOURS = 3 * 60 * 60 * 1000;

    private final CurrencyRepository currencyRepository;
    private final CurrencyMapper currencyMapper;
    private final RestTemplate restTemplate;

    public UpdateCurrencyExchangeRateService(CurrencyRepository currencyRepository,
                                             CurrencyMapper currencyMapper,
                                             RestTemplate restTemplate) {
        this.currencyRepository = currencyRepository;
        this.currencyMapper = currencyMapper;
        this.restTemplate = restTemplate;
    }

    @Scheduled(fixedDelay = TWENTY_MINUTES, initialDelay = THREE_HOURS)
    @Transactional
    protected void refreshEuroExchangeRate() {
        log.debug("Scheduled exchange rate update attempt.");
        for (Currency currency : getUpdated()) {
            LocalDateTime now = LocalDateTime.now();
            currency.setLastUpdated(now);
            currency.setLastAutoUpdateAttempt(now);
        }
    }

    @Transactional
    public List<CurrencyDto> getUpdatedCurrencies() {
        return currencyMapper.toDtos(getUpdated());
    }

    private List<Currency> getUpdated() {
        Currency euro = getCurrency(CurrencyCode.EUR);
        Optional.ofNullable(requestEuroExchangeRate())
                .ifPresent(newEuroExchangeRate -> setExchangeRate(euro, newEuroExchangeRate));
        return Collections.singletonList(euro);
    }

    private Currency getCurrency(CurrencyCode currencyCode) {
        return Optional.ofNullable(currencyRepository.findByCurrencyCode(currencyCode))
                .orElseThrow(() -> new NotSupportedCurrencyException());
    }

    private void setExchangeRate(Currency euro, BigDecimal newEuroExchangeRate) {
        BigDecimal currencyRate = ValueCalculator.calculateExchangeRate(newEuroExchangeRate);
        euro.setCurrencyRate(currencyRate);
        euro.setLastUpdated(LocalDateTime.now());
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

}
