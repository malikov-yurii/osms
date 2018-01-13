package com.malikov.shopsystem.enumtype;

/**
 * @author Yurii Malikov
 */
public enum CurrencyCode {

    EUR("eur"), UAH("UAH");

    private String code;

    CurrencyCode(String code) {
        this.code = code;
    }

    public static CurrencyCode forCurrencyCode(String code) {
        for(CurrencyCode currencyCode : CurrencyCode.values()) {
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
