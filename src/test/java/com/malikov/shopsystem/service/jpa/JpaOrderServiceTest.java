package com.malikov.shopsystem.service.jpa;

import com.malikov.shopsystem.Profiles;
import com.malikov.shopsystem.service.AbstractOrderServiceTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles(Profiles.JPA)
public class JpaOrderServiceTest extends AbstractOrderServiceTest {
}
