const shopifyService = require("../generic/service/shopifyService");
const { executeGraphqlQuery: executeProductGraphqlQuery } = require("../generic/service/graphQLService");

class ProductService {
  async getAllProducts(limit = 1, pageCursor = "", filter = {}, sort = "CREATED_AT", reverse=true) {
	const query = `
    {
      products(first: ${limit}, sortKey: ${sort}, reverse: ${reverse}, ${pageCursor ? `after: "${pageCursor}"` : ''}) {
        edges {
          cursor
          node {
            id
            title
            createdAt
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `;
 
	try {
	  const data = await executeProductGraphqlQuery(query);
	  console.log(data);
	  const products = data.products.edges.map((edge:any) => edge.node);
	  console.log(products);
    const pageInfo = data.products.pageInfo;
	 console.log(pageInfo);
	  return data;
	} catch (error) {
      console.error(error);
      throw error;
    }
 }
 

  //const productsWithMetafields = await Promise.all(fetchProducts.map(async (product) => {
  // 	const metafields = await this.getProductMetafields(product.id);
  // 	return {
  // 		  ...product,
  // 		  metafields
  // 	};
  //  }));


//   async fetchLatestProducts(limit = 6) {
//     try {
//       const products = await this.shopify.product.list({
//         limit,
//         fields: "id,title,created_at",
//         order: "created_at DESC",
//       });

//       //   const productsWithMetafields = await Promise.all(products.map(async (product) => {
//       // 	const metafields = await this.getProductMetafields(product.id);
//       // 	return {
//       // 		  ...product,
//       // 		  metafields
//       // 	};
//       //   }));

//       return products;
//     } catch (error) {
//       console.error("Error fetching latest products:", error);
//       throw error;
//     }
//   }

//   async getProductWithMetafields(productId: any) {
//     try {
//       const product = await shopifyService.shopify.product.get(productId, {
//         fields:
//           "id,title,body_html,product_type,created_at,updated_at,handle,variants, image, images, options",
//       });

//       const metafields = await shopifyService.shopify.metafield.list({
//         metafield: { owner_resource: "product", owner_id: productId },
//         fields: "id, key, value",
//       });

//       const productWithMetafields = {
//         product,
//         metafields,
//       };

//       return productWithMetafields;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
}

const productService = new ProductService();
module.exports = productService;
