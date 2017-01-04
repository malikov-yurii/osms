package com.malikov.shopsystem.service;

import com.malikov.shopsystem.model.ProductCategory;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;

import static com.malikov.shopsystem.ProductCategoryTestData.*;

public abstract class AbstractProductCategoryServiceTest extends AbstractServiceTest {

    @Autowired
    protected ProductCategoryService service;

    @Test
    public void testSave() throws Exception {
        ProductCategory newProductCategory = new ProductCategory("newCategoryName");
        ProductCategory created = service.save(newProductCategory);
        newProductCategory.setId(created.getId());
        MATCHER.assertCollectionEquals(
                Arrays.asList(CATEGORY_KLEI, CATEGORY_LAKI, CATEGORY_POTAL_I_ZOLOTO, newProductCategory),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        ProductCategory updated = new ProductCategory(CATEGORY_KLEI);
        updated.setName("Klei_upd");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(CATEGORY_KLEI.getId()));
    }

    @Test
    public void testGet() throws Exception {
        ProductCategory productCategory = service.get(CATEGORY_LAKI.getId());
        MATCHER.assertEquals(CATEGORY_LAKI, productCategory);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<ProductCategory> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(CATEGORY_POTAL_I_ZOLOTO,
                CATEGORY_LAKI, CATEGORY_KLEI), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(CATEGORY_POTAL_I_ZOLOTO.getId());
        MATCHER.assertCollectionEquals(Arrays.asList(
                CATEGORY_KLEI, CATEGORY_LAKI), service.getAll());
    }
}
