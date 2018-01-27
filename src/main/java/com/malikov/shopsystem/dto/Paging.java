package com.malikov.shopsystem.dto;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

public class Paging implements Serializable {

    public static final int DEFAULT_PAGE_NUMBER = 0;
    public static final int DEFAULT_SIZE = Integer.MAX_VALUE;

    private int page = DEFAULT_PAGE_NUMBER;
    private int size = DEFAULT_SIZE;

    public Paging(int page, int limit) {
        this.page = page;
        this.size = limit;
    }

    public Paging() {
    }

    public static Paging defaultPaging() {
        return new Paging(DEFAULT_PAGE_NUMBER, DEFAULT_SIZE);
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }


    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (obj == this) {
            return true;
        }
        if (obj.getClass() != getClass()) {
            return false;
        }
        Paging rhs = (Paging) obj;
        return new EqualsBuilder()
                .append(this.page, rhs.page)
                .append(this.size, rhs.size)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(page)
                .append(size)
                .toHashCode();
    }

}
