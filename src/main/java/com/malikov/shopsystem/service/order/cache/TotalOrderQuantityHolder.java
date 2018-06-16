package com.malikov.shopsystem.service.order.cache;

public final class TotalOrderQuantityHolder {

    private TotalOrderQuantityHolder() {
    }

    public static volatile long cachedOrderQuantity;

}
