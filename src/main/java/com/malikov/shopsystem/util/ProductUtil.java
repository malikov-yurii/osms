package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.to.ProductTo;

public class ProductUtil {

    public static Product createNewFromTo(ProductTo productTo) {
        return new Product(null, productTo.getName(), productTo.getPrice(), productTo.getUnlimited(), productTo.getQuantity(), productTo.getHasVariations(),
                null,null);
    }

    public static ProductTo asTo(Product product){
        return new ProductTo(product.getId(), product.getName(), product.getPrice(), product.getQuantity(), product.getUnlimited(), product.getHasVariations());
    }

    public static Product updateFromTo(Product product, ProductTo productTo) {
        product.setName(productTo.getName());
        product.setPrice(productTo.getPrice());
        product.setQuantity(productTo.getQuantity());
        product.setUnlimited(productTo.getUnlimited());
        product.setHasVariations(productTo.getHasVariations());
        return product;
    }

}
