package com.malikov.shopsystem.util;

import com.malikov.shopsystem.model.Product;
import com.malikov.shopsystem.to.ProductTo;

public class ProductUtil {

    public static Product createNewFromTo(ProductTo productTo) {
        return new Product(null, productTo.getName(), productTo.getPrice(), false, productTo.getQuantity(), false,
                null,null);
    }

    public static ProductTo asTo(Product product){
        return new ProductTo(product.getId(), product.getName(), product.getPrice(), product.getQuantity());
    }

    public static Product updateFromTo(Product product, ProductTo productTo) {
        product.setName(productTo.getName());
        product.setPrice(productTo.getPrice());
        product.setQuantity(productTo.getQuantity());
        return product;
    }


}
