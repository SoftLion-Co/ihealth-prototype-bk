const shopifyService = require("../generic/service/shopifyService");

class ProductService {
	
	async fetchProducts(limit = 1, page = 2, filter = {}, sort = 'created_at desc') {
		try {
			const options = {
				limit,
				page,
				...filter,
				order: sort
			 };

      const fetchProducts = await shopifyService.shopify.product.list(options);
		//const productsWithMetafields = await Promise.all(fetchProducts.map(async (product) => {
		// 	const metafields = await this.getProductMetafields(product.id);
		// 	return {
		// 		  ...product,
		// 		  metafields
		// 	};
		//  }));
      return fetchProducts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async fetchLatestProducts(limit = 6) {
	try {
	  const products = await this.shopify.product.list({
		 limit,
		 fields: 'id,title,created_at',
		 order: 'created_at DESC',
	  });

	//   const productsWithMetafields = await Promise.all(products.map(async (product) => {
	// 	const metafields = await this.getProductMetafields(product.id);
	// 	return {
	// 		  ...product,
	// 		  metafields
	// 	};
	//   }));

	  return products;
	} catch (error) {
	  console.error('Error fetching latest products:', error);
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

