package com.malikov.shopsystem;

public class Profiles {

    public static final String
             MYSQL = "mySqlProduction",
             MYSQL_TEST = "mySqlTest"
            ,JPA = "jpa"
            ,HEROKU = "heroku";

    public static final String ACTIVE_DB = MYSQL;
    public static final String DB_IMPLEMENTATION = JPA;
}
