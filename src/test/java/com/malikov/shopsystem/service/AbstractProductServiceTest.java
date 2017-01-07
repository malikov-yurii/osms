package com.malikov.shopsystem.service;

import com.malikov.shopsystem.ProductTestData;
import com.malikov.shopsystem.model.Product;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static com.malikov.shopsystem.ProductCategoryTestData.CATEGORY_KLEI;
import static com.malikov.shopsystem.ProductCategoryTestData.CATEGORY_POTAL_I_ZOLOTO;
import static com.malikov.shopsystem.ProductTestData.*;

public abstract class AbstractProductServiceTest extends AbstractServiceTest {

    @Autowired
    protected ProductService service;

    @Test
    public void testSave() throws Exception {
        Product newProduct = new Product("newProductName", 100, false, 111, false, Collections.singleton(CATEGORY_KLEI), null);
        Product created = service.save(newProduct);
        newProduct.setId(created.getId());
        ProductTestData.MATCHER.assertCollectionEquals(
                Arrays.asList(POTAL_KITAJ, POTAL_NAZIONALE, SHELLAC_MANETTI, FERRARIO_ROZOVYJ, newProduct),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        Product updated = new Product(POTAL_KITAJ);
        updated.setName("Kitaj_upd");
        service.update(updated);
        ProductTestData.MATCHER.assertEquals(updated, service.get(POTAL_KITAJ.getId()));
    }

    @Test
    public void testGet() throws Exception {
        Product product = service.get(POTAL_NAZIONALE.getId());
        ProductTestData.MATCHER.assertEquals(POTAL_NAZIONALE, product);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Product> all = service.getAll();
        ProductTestData.MATCHER.assertCollectionEquals(Arrays.asList(POTAL_KITAJ, POTAL_NAZIONALE,
                SHELLAC_MANETTI, FERRARIO_ROZOVYJ), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(POTAL_NAZIONALE.getId());
        ProductTestData.MATCHER.assertCollectionEquals(Arrays.asList(
                POTAL_KITAJ, SHELLAC_MANETTI, FERRARIO_ROZOVYJ), service.getAll());
    }

    @Test
    public void testGetByCategoryId() throws Exception {
        Collection<Product> productsByCategoryId = service.getByCategoryId(CATEGORY_POTAL_I_ZOLOTO.getId());
        ProductTestData.MATCHER.assertCollectionEquals(Arrays.asList(POTAL_NAZIONALE, POTAL_KITAJ), productsByCategoryId);
    }

    @Test
    public void testGetAllQuantityLessThan() throws Exception {
        Collection<Product> productsWhereQuantityLessThan = service.getAllQuantityLessThan(30);
        ProductTestData.MATCHER.assertCollectionEquals(
                Arrays.asList(SHELLAC_MANETTI, POTAL_KITAJ), productsWhereQuantityLessThan);
    }
}
