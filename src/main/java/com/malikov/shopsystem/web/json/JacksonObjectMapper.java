package com.malikov.shopsystem.web.json;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * <p> * Handling Hibernate lazy-loading
 *
 * @link https://github.com/FasterXML/jackson
 * @link https://github.com/FasterXML/jackson-datatype-hibernate
 * @link http://wiki.fasterxml.com/JacksonHowToCustomSerializers
 */
public class JacksonObjectMapper extends ObjectMapper {

    private static final ObjectMapper MAPPER = new JacksonObjectMapper();

    public static ObjectMapper getMapper() {
        return MAPPER;
    }

    private JacksonObjectMapper() {
        registerModule(new Hibernate5Module());

        registerModule(new JavaTimeModule());
        configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

        setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
        configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        configure(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT, true);
        configure(DeserializationFeature.FAIL_ON_MISSING_CREATOR_PROPERTIES, false);
        configure(DeserializationFeature.FAIL_ON_NULL_CREATOR_PROPERTIES, false);
        //configure(DeserializationFeature., false);

        setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE);
        setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

}