package com.malikov.shopsystem.service.jpa;

import org.springframework.test.context.ActiveProfiles;
import ua.com.malikov.Profiles;
import ua.com.malikov.service.jdbc.JdbcCompanyServiceTest;

@ActiveProfiles(Profiles.JPA)
public class JpaCompanyServiceTest extends JdbcCompanyServiceTest{
}
