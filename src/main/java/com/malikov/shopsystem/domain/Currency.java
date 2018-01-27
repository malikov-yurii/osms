package com.malikov.shopsystem.domain;

import com.malikov.shopsystem.enumtype.CurrencyCodeIso;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.math.BigInteger;

@Entity
@Table(name = "jos_jshopping_currencies")
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "currency_id", columnDefinition = "bigint(11)", unique = true, nullable = false)
    private BigInteger currencyId;

    @Type(type = "com.malikov.shopsystem.domain.converter.CurrencyCodeUserType")
    @Column(name = "currency_code_iso", columnDefinition = "varchar(3)", nullable = false)
    private CurrencyCodeIso currencyCodeIso;

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

    public CurrencyCodeIso getCurrencyCodeIso() {
        return currencyCodeIso;
    }

    public void setCurrencyCodeIso(CurrencyCodeIso currencyCodeIso) {
        this.currencyCodeIso = currencyCodeIso;
    }

}
