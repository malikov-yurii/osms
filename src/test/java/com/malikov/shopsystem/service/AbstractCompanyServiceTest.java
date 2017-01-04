package com.malikov.shopsystem.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ua.com.malikov.model.Company;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static ua.com.malikov.CompanyTestData.*;

public abstract class AbstractCompanyServiceTest extends AbstractServiceTest {

    @Autowired
    protected CompanyService service;

    @Test
    public void testAdd() throws Exception {
        Company newCompany = new Company("newCompany");
        Company created = service.add(newCompany);
        newCompany.setId(created.getId());
        MATCHER.assertCollectionEquals(
                Arrays.asList(COMPANY_CIKLUM, COMPANY_EPAM, COMPANY_GLOBAL_LOGIC,
                        COMPANY_LUXOFT, COMPANY_SOFTSERVE, newCompany),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Company updated = new Company(COMPANY_EPAM);
        updated.setName("EPAM_Updated");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(COMPANY_EPAM.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Company company = service.get(COMPANY_GLOBAL_LOGIC.getId());
        MATCHER.assertEquals(COMPANY_GLOBAL_LOGIC, company);
    }

    @Test
    public void testGetByName() throws Exception {
        Company company = service.get(COMPANY_LUXOFT.getName());
        MATCHER.assertEquals(COMPANY_LUXOFT, company);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Company> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(COMPANY_CIKLUM, COMPANY_EPAM,
                COMPANY_GLOBAL_LOGIC, COMPANY_LUXOFT, COMPANY_SOFTSERVE), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(COMPANY_LUXOFT.getId());
        MATCHER.assertCollectionEquals(Arrays.asList(COMPANY_CIKLUM, COMPANY_EPAM,
                COMPANY_GLOBAL_LOGIC, COMPANY_SOFTSERVE), service.getAll());
    }

    @Test
    public void testDeleteAll() throws Exception {
        service.deleteAll();
        MATCHER.assertCollectionEquals(Collections.EMPTY_LIST, service.getAll());
    }
}
