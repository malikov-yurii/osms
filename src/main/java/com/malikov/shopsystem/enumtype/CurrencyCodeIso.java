package com.malikov.shopsystem.enumtype;

/**
 * @author Yurii Malikov
 */
public enum CurrencyCodeIso {

    EUR("eur"), UAH("UAH");

    private String code;

    CurrencyCodeIso(String code) {
        this.code = code;
    }

    public static CurrencyCodeIso forCurrencyCode(String code) {
        for(CurrencyCodeIso currencyCode : CurrencyCodeIso.values()) {
            if (currencyCode.code().equals(code)) {
                return currencyCode;
            }
        }
        throw new IllegalArgumentException("Unknown currency code" + code);
    }

    public String code() {
        return code;
    }

}
