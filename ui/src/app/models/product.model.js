var Product = /** @class */ (function () {
    function Product() {
        this.orderLineId = "0-" + Product.count++;
        this.productId = 0;
        this.productVariationId = 0;
        this.orderLineProductName = '';
        this.orderLineProductQuantity = '0';
        this.orderLineProductPrice = '0';
        this.productCategories = [''];
    }
    Product.count = 0;
    return Product;
}());
export { Product };
