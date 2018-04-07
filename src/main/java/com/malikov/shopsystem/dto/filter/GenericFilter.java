package com.malikov.shopsystem.dto.filter;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.malikov.shopsystem.dto.Paging;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class GenericFilter<F, R> {

    @JsonUnwrapped
    private F filteringFields;
    private List<R> filterResult;
    private Paging paging;

}
