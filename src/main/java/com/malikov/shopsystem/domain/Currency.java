package com.malikov.shopsystem.domain;

import com.malikov.shopsystem.enumtype.CurrencyCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Table(name = "jos_jshopping_currencies")
@Getter
@Setter
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "currency_id", columnDefinition = "bigint(11)", unique = true, nullable = false)
    private BigInteger currencyId;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency_code_iso", columnDefinition = "varchar(3)", nullable = false)
    private CurrencyCode currencyCode;

    @Column(name = "currency_value")
    private BigDecimal currencyRate;

    @Column(name = "currency_last_updated", columnDefinition = "timestamp")
    private LocalDateTime lastUpdated;

    @Column(name = "currency_last_auto_updated", columnDefinition = "timestamp")
    private LocalDateTime lastAutoUpdated;

}
