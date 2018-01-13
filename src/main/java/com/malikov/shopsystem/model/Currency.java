package com.malikov.shopsystem.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;

/**
 * @author Yurii Malikov
 */
@Entity
@Table(name = "jos_jshopping_currencies")
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "currency_id")
    private BigInteger currencyId;

    @Column(name = "currency_value")
    private BigDecimal currencyRate;

    public BigInteger getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(BigInteger currencyId) {
        this.currencyId = currencyId;
    }

    public BigDecimal getCurrencyRate() {
        return currencyRate;
    }

    public void setCurrencyRate(BigDecimal currencyRate) {
        this.currencyRate = currencyRate;
    }

}
