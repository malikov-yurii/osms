package com.malikov.shopsystem.to;

import java.util.List;

public class OrderDatatablePageTo {

    private Integer draw;

    private Long recordsTotal;

    private Long recordsFiltered;

    private List<OrderTo> data;

    public OrderDatatablePageTo(Integer draw, Long recordsTotal, Long recordsFiltered, List<OrderTo> data) {
        this.draw = draw;
        this.recordsTotal = recordsTotal;
        this.recordsFiltered = recordsFiltered;
        this.data = data;
    }

    public Integer getDraw() {
        return draw;
    }

    public void setDraw(Integer draw) {
        this.draw = draw;
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

    public List<OrderTo> getData() {
        return data;
    }

    public void setData(List<OrderTo> data) {
        this.data = data;
    }
}
