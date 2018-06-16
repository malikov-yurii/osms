package com.malikov.shopsystem.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Paging implements Serializable {

    public static final int DEFAULT_PAGE_NUMBER = 0;
    public static final int DEFAULT_SIZE = Integer.MAX_VALUE;

    private int pageNumber = DEFAULT_PAGE_NUMBER;
    private int pageSize = DEFAULT_SIZE;

}
