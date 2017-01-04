package com.malikov.shopsystem.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ua.com.malikov.model.Skill;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static ua.com.malikov.SkillTestData.*;

public abstract class AbstractSkillServiceTest extends AbstractServiceTest {

    @Autowired
    protected SkillService service;

    @Test
    public void testAdd() throws Exception {
        Skill newSkill = new Skill("newSkill");
        Skill created = service.add(newSkill);
        newSkill.setId(created.getId());
        MATCHER.assertCollectionEquals(
                Arrays.asList(JAVA, SQL, SPRING, JUNIT, MAVEN, newSkill),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Skill updated = new Skill(MAVEN);
        updated.setName("Maven_Updated");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(MAVEN.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Skill skill = service.get(SPRING.getId());
        MATCHER.assertEquals(SPRING, skill);
    }

    @Test
    public void testGetByName() throws Exception {
        Skill skill = service.get(JUNIT.getName());
        MATCHER.assertEquals(JUNIT, skill);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Skill> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(JAVA, SQL, SPRING, JUNIT, MAVEN), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(MAVEN.getId());
        MATCHER.assertCollectionEquals(Arrays.asList(JAVA, SQL, SPRING, JUNIT), service.getAll());
    }

    @Test
    public void testDeleteAll() throws Exception {
        service.deleteAll();
        MATCHER.assertCollectionEquals(Collections.EMPTY_LIST, service.getAll());
    }
}