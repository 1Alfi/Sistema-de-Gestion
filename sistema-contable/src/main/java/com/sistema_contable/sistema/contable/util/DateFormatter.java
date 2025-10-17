package com.sistema_contable.sistema.contable.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;

public class DateFormatter {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final ZoneId zoneId = ZoneId.systemDefault();


    public Date beforeDate(String dateString) throws DateTimeParseException {
        LocalDate localDate = LocalDate.parse(dateString, formatter);
        LocalDateTime startOfDay = localDate.atStartOfDay();
        return Date.from(startOfDay.atZone(zoneId).toInstant());}

    public Date afterDate(String dateString) throws DateTimeParseException {
        LocalDate localDate = LocalDate.parse(dateString, formatter);
        LocalDateTime endOfDay = localDate.atTime(LocalTime.MAX);
        return Date.from(endOfDay.atZone(zoneId).toInstant());}
}
