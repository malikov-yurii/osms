package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.CurrencyDto;
import com.malikov.shopsystem.service.currency.CurrencyService;
import com.malikov.shopsystem.service.currency.UpdateCurrencyExchangeRateService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/currencies", produces = MediaType.APPLICATION_JSON_VALUE)
public class CurrencyController {

    private final CurrencyService currencyService;
    private final UpdateCurrencyExchangeRateService updateCurrencyExchangeRateService;

    public CurrencyController(CurrencyService currencyService,
                              UpdateCurrencyExchangeRateService updateCurrencyExchangeRateService) {
        this.currencyService = currencyService;
        this.updateCurrencyExchangeRateService = updateCurrencyExchangeRateService;
    }

    @GetMapping("/updated")
    public List<CurrencyDto> getUpdatedCurrencies() {
        return updateCurrencyExchangeRateService.getUpdatedCurrencies();
    }

    @GetMapping
    public List<CurrencyDto> getCurrencies() {
        return currencyService.getAll();
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateCurrencies(@RequestBody List<CurrencyDto> dtos) {
        currencyService.update(dtos);
    }

}
