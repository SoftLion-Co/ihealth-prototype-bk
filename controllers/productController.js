const productService = require("../services/ProductService");

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const productWithMetafields = await productService.getProductWithMetafields(productId);
      res.send(productWithMetafields);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

const productController = new ProductController();
module.exports = productController;
