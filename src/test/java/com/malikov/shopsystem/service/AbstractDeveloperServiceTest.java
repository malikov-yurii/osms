package com.malikov.shopsystem.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ua.com.malikov.model.Developer;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

import static ua.com.malikov.CompanyTestData.COMPANY_CIKLUM;
import static ua.com.malikov.DeveloperTestData.*;
import static ua.com.malikov.SkillTestData.JAVA;
import static ua.com.malikov.SkillTestData.MAVEN;

public abstract class AbstractDeveloperServiceTest extends AbstractServiceTest {

    @Autowired
    protected DeveloperService service;

    @Test
    public void testAdd() throws Exception {
        Developer newDeveloper = new Developer("NewName", "NewLastName",
                COMPANY_CIKLUM, new HashSet<>(Arrays.asList(JAVA, MAVEN)));
        Developer created = service.add(newDeveloper);
        newDeveloper.setId(created.getId());
        MATCHER.assertCollectionEquals(
                Arrays.asList(KOSINSKYI, LEN, MALIKOV, SENCHUK, VOLKOV, newDeveloper),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Developer updated = new Developer(MALIKOV);
        updated.setName("Yurii_Updated");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(MALIKOV.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Developer developer = service.get(KOSINSKYI.getId());
        MATCHER.assertEquals(KOSINSKYI, developer);
    }

    @Test
    public void testGetByLastName() throws Exception {
        Developer developer = service.get(SENCHUK.getLastName());
        MATCHER.assertEquals(SENCHUK, developer);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Developer> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(KOSINSKYI, LEN, MALIKOV, SENCHUK, VOLKOV), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(LEN.getId());
        MATCHER.assertCollectionEquals(Arrays.asList(KOSINSKYI, MALIKOV, SENCHUK, VOLKOV), service.getAll());
    }

    @Test
    public void testDeleteAll() throws Exception {
        service.deleteAll();
        MATCHER.assertCollectionEquals(Collections.EMPTY_LIST, service.getAll());
    }
}
