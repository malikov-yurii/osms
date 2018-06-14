package com.malikov.shopsystem.service.caching;

public final class TotalOrderQuantityHolder {

    private TotalOrderQuantityHolder() {
    }

    public static volatile long cachedOrderQuantity;

}
