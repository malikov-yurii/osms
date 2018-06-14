package com.malikov.shopsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Page<T> {

    List<T> content;
    long totalElements;

    public Page() {
    }

    public Page(List<T> content, long totalElements) {
        this.content = content;
        this.totalElements = totalElements;
    }

}
