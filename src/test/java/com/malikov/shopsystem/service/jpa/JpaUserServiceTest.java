package com.malikov.shopsystem.service.jpa;

import com.malikov.shopsystem.Profiles;
import com.malikov.shopsystem.service.AbstractUserServiceTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles(Profiles.JPA)
public class JpaUserServiceTest extends AbstractUserServiceTest {
}
