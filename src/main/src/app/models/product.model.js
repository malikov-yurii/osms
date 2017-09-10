var Product = /** @class */ (function () {
    function Product() {
        this.id = "0-" + Product.count++;
        this.productId = 0;
        this.productVariationId = 0;
        this.name = '';
        this.categories = [''];
        this.quantity = '0';
        this.price = '0';
        this.supplier = '';
    }
    Product.count = 0;
    return Product;
}());
export { Product };
