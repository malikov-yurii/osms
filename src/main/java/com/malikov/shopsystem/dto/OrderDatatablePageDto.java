package com.malikov.shopsystem.dto;

import java.util.List;

public class OrderDatatablePageDto {

    private Long recordsTotal;

    private Long recordsFiltered;

    private List<OrderDto> data;

    public OrderDatatablePageDto(Long recordsTotal, Long recordsFiltered, List<OrderDto> data) {
        this.recordsTotal = recordsTotal;
        this.recordsFiltered = recordsFiltered;
        this.data = data;
    }

    public Long getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(Long recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public Long getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(Long recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public List<OrderDto> getData() {
        return data;
    }

    public void setData(List<OrderDto> data) {
        this.data = data;
    }

}
