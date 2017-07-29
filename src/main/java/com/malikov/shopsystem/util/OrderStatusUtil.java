package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.OrderStatus;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static com.malikov.shopsystem.model.OrderStatus.*;

/**
 * @author Yurii Malikov
 */
public class OrderStatusUtil {

    public static Set<OrderStatus> WITHDRAWAL_STATUSES = new HashSet<>(Arrays.asList(OK, SHP, WFP));

    public static boolean isWithdrawalStatus(OrderStatus orderStatus) {
        return WITHDRAWAL_STATUSES.contains(orderStatus);
    }

}
