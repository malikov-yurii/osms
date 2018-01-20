package com.malikov.shopsystem.util;

import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

/**
 * @author Yurii Malikov
 */
public class DateTimeUtil {

    public static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm";
    public static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(DATE_TIME_PATTERN);
    public static final LocalDateTime MIN = LocalDateTime.of(2000, 1, 1, 1, 1);
    public static final LocalDateTime MAX = LocalDateTime.of(2030, 1, 1, 1, 1);

    private DateTimeUtil() {
        // util class
    }

    public static LocalDateTime parseToLocalDateTime(String str) {
        return parseToLocalDateTime(str, DATE_TIME_FORMATTER);
    }

    public static LocalDateTime parseToLocalDateTime(String str, DateTimeFormatter formatter) {
        return StringUtils.isEmpty(str) ? LocalDateTime.now() : LocalDateTime.parse(str, formatter);
    }

    public static LocalDateTime utcToZoneId(LocalDateTime localDateTime, ZoneId zoneId) {
        return localDateTime.atZone(ZoneId.of("UTC")).withZoneSameInstant(zoneId).toLocalDateTime();
    }

    public static LocalDateTime zoneIdToUtc(LocalDateTime localDateTime, ZoneId zoneId) {
        return localDateTime.atZone(zoneId).withZoneSameInstant(ZoneId.of("UTC")).toLocalDateTime();
    }

    public static String toString(LocalDateTime localDateTime) {
        return localDateTime == null ? "" : localDateTime.format(DATE_TIME_FORMATTER);
    }

    public static LocalDate parseLocalDate(String str) {
        return StringUtils.isEmpty(str) ? null : LocalDate.parse(str);
    }

    public static LocalTime parseLocalTime(String str) {
        return StringUtils.isEmpty(str) ? null : LocalTime.parse(str);
    }

    public static LocalDateTime parseLocalDateTime(String str) {
        return parseLocalDateTime(str, DATE_TIME_FORMATTER);
    }

    public static LocalDateTime parseLocalDateTime(String str, DateTimeFormatter formatter) {
        return StringUtils.isEmpty(str) ? LocalDateTime.now() : LocalDateTime.parse(str, formatter);
    }
}
