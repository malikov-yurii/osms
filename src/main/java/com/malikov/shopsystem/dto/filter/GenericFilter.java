package com.malikov.shopsystem.dto.filter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.malikov.shopsystem.dto.Paging;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.List;

public class GenericFilter<F, R> {

    private Paging paging;
    @JsonUnwrapped
    private F filteringFields;
    private List<R> filterResult;

    public GenericFilter() {
        // Empty constructor
    }

    public GenericFilter(F filteringFields, List<R> filterResult, Paging paging) {
        this.filteringFields = filteringFields;
        this.filterResult = filterResult;
        this.paging = paging;
    }

    public Paging getPaging() {
        return paging;
    }

    public void setPaging(Paging paging) {
        this.paging = paging;
    }

    @JsonIgnore
    public Paging getPagingOrDefault() {
        return paging != null ? paging : Paging.defaultPaging();
    }

    public F getFilteringFields() {
        return filteringFields;
    }

    public void setFilteringFields(F filteringFields) {
        this.filteringFields = filteringFields;
    }

    public List<R> getFilterResult() {
        return filterResult;
    }

    public void setFilterResult(List<R> filterResult) {
        this.filterResult = filterResult;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GenericFilter<?, ?> that = (GenericFilter<?, ?>) o;

        return new EqualsBuilder()
                .append(paging, that.paging)
                .append(filteringFields, that.filteringFields)
                .append(filterResult, that.filterResult)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(paging)
                .append(filteringFields)
                .append(filterResult)
                .toHashCode();
    }

}
