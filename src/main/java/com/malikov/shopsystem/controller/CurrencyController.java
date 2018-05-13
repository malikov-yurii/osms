package com.malikov.shopsystem.controller;

import com.malikov.shopsystem.dto.CurrencyDto;
import com.malikov.shopsystem.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
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

    private CurrencyService currencyService;

    @Autowired
    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @GetMapping
    public List<CurrencyDto> getCurrencies() {
        return currencyService.get();
    }

    @GetMapping("/updated")
    public List<CurrencyDto> getUpdatedCurrencies() {
        return currencyService.getUpdated();
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateCurrencies(@RequestBody List<CurrencyDto> dtos) {
        currencyService.update(dtos);
    }

}
