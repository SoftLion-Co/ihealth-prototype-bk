const shopifyService = require("../generic/service/shopifyService");

class ProductService {
	
  async fetchProducts(limit = 30) {
    try {
      const fetchProducts = await shopifyService.shopify.product.list({
        limit,
      });
      return fetchProducts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductWithMetafields(productId) {
    try {
      const product = await shopifyService.shopify.product.get(productId, {
			fields: "id,title,body_html,product_type,created_at,updated_at,handle,variants, image, images, options"
		 });
      const metafields = await shopifyService.shopify.metafield.list({
        metafield: { owner_resource: "product", owner_id: productId },
		   fields: "id, key, value"
      });

      const productWithMetafields = {
        product,
        metafields, 
      };

      return productWithMetafields;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const productService = new ProductService();
module.exports = productService;

