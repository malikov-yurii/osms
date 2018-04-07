package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Page<T> {

    List<T> content;
    long totalElements;
    int totalPages;

}
