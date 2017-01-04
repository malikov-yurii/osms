package com.malikov.shopsystem.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ua.com.malikov.model.Project;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

import static ua.com.malikov.CompanyTestData.COMPANY_CIKLUM;
import static ua.com.malikov.CustomerTestData.*;
import static ua.com.malikov.DeveloperTestData.MALIKOV;
import static ua.com.malikov.DeveloperTestData.SENCHUK;
import static ua.com.malikov.ProjectTestData.MATCHER;
import static ua.com.malikov.ProjectTestData.*;

public abstract class AbstractProjectServiceTest extends AbstractServiceTest {

    @Autowired
    protected ProjectService service;

    @Test
    public void testAdd() throws Exception {
        Project newProject = new Project(
                "New project name", COMPANY_CIKLUM, CUSTOMER_CITI_BANK,
                new HashSet<>(Arrays.asList(MALIKOV, SENCHUK)),  111111f );
        Project created = service.add(newProject);
        newProject.setId(created.getId());
        MATCHER.assertCollectionEquals(
                Arrays.asList(PROJECT_FINANCIAL_SOFTWARE, PROJECT_TICKETING_SOFTWARE, PROJECT_WEBSITE_PROJECT,
                        PROJECT_CMS_SOFTWARE, PROJECT_WEBSITE_ARCHITECTURE, newProject),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Project updated = new Project(PROJECT_CMS_SOFTWARE);
        updated.setName("PROJECT_CMS_SOFTWARE_Updated");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(PROJECT_CMS_SOFTWARE.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Project project = service.get(PROJECT_FINANCIAL_SOFTWARE.getId());
        MATCHER.assertEquals(PROJECT_FINANCIAL_SOFTWARE, project);
    }

    @Test
    public void testGetByName() throws Exception {
        Project project = service.get(PROJECT_TICKETING_SOFTWARE.getName());
        MATCHER.assertEquals(PROJECT_TICKETING_SOFTWARE, project);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Project> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(PROJECT_FINANCIAL_SOFTWARE,
                PROJECT_TICKETING_SOFTWARE, PROJECT_WEBSITE_PROJECT,
                PROJECT_CMS_SOFTWARE, PROJECT_WEBSITE_ARCHITECTURE), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(PROJECT_FINANCIAL_SOFTWARE.getId());
        MATCHER.assertCollectionEquals(Arrays.asList(
                PROJECT_TICKETING_SOFTWARE, PROJECT_WEBSITE_PROJECT,
                PROJECT_CMS_SOFTWARE, PROJECT_WEBSITE_ARCHITECTURE), service.getAll());
    }

    @Test
    public void testDeleteAll() throws Exception {
        service.deleteAll();
        MATCHER.assertCollectionEquals(Collections.EMPTY_LIST, service.getAll());
    }

}
