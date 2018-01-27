package com.malikov.shopsystem.domain;

import com.malikov.shopsystem.enumtype.CurrencyCode;
import org.hibernate.annotations.Type;

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

    @Type(type = "com.malikov.shopsystem.util.converter.CurrencyCodeUserType")
    @Column(name = "currency_code_iso")
    private CurrencyCode currencyCode;

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

    public CurrencyCode getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(CurrencyCode currencyCode) {
        this.currencyCode = currencyCode;
    }
}
