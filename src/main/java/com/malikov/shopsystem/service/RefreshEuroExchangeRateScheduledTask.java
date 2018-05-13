package com.malikov.shopsystem.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class RefreshEuroExchangeRateScheduledTask {

    private static final int TWENTY_MINUTES = 20 * 60 * 1000;
    private static final int THREE_HOURS = 3 * 60 * 60 * 1000;

    private CurrencyService currencyService;

    @Autowired
    public RefreshEuroExchangeRateScheduledTask(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @Scheduled(fixedDelay = TWENTY_MINUTES, initialDelay = THREE_HOURS)
    public void refreshEuroExchangeRate() {
        currencyService.scheduledCurrenciesUpdate();
        log.info("Euro exchange rate has been successfully automatically updated.");
    }

}
