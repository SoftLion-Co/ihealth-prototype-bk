const ShopifyService = require("../generic/service/shopifyService");
const {
  executeGraphqlQuery: executeProductGraphqlQuery,
} = require("../generic/service/graphQLService");

interface Product {
  id: string;
  title: string;
  price?: string;
  originalSrc?: string;
  displayName: string;
}

// interface Variant {
//   id: number;
//   product_id: number;
//   title: string;
//   price: string;
//   sku: string;
//   position: number;
//   inventory_policy: string;
//   compare_at_price: string | null;
//   fulfillment_service: string;
//   inventory_management: string | null;
//   option1: string;
//   option2: string | null;
//   option3: string | null;
//   created_at: Date;
//   grams: number;
//   weight: number;
//   weight_unit: string;
//   inventory_item_id: number;
//   inventory_quantity: number;
//   old_inventory_quantity: number;
//   requires_shipping: boolean;
//   admin_graphql_api_id: string;
//   image_id: number | null;
// }

// interface Option {
//   id: number;
//   product_id: number;
//   name: string;
//   position: number;
//   values: string[];
// }

// interface Product {
//   id: number;
//   title: string;
//   body_html: string | null;
//   vendor: string;
//   product_type: string;
//   created_at: Date;
//   handle: string;
//   updated_at: Date;
//   published_at: Date;
//   template_suffix: string | null;
//   published_scope: string;
//   tags: string;
//   status: string;
//   admin_graphql_api_id: string;
//   variants: Variant[];
//   options: Option[];
//   images: string[];
//   image: string | null;
// }

class ProductService {
  async getAllProducts(
    limit = 24,
    pageCursor = "",
    filter = {},
    sort = "CREATED_AT",
    reverse = true
  ) {
    const query = `
    {
      products(first: ${limit}, sortKey: ${sort}, reverse: ${reverse}, ${
      pageCursor ? `after: "${pageCursor}"` : ""
    }) {
        edges {
          node {
            id
            title
            createdAt
				handle
				 variants(first: 1) {
              edges {
                node {
                  price
                }
              }
            }
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
      // console.log(data);
      const products = data.products.edges.map((edge: any) => edge.node);
      console.log(products);

      const pageInfo = data.products.pageInfo;
      // console.log(pageInfo);
      return products;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchLatestProducts(title = "GymBeam", limit = 4) {
    try {
      // const data = ShopifyService.shopify.product.list();
      const query = `
		{
      products(first: ${limit}, query: "title:*${title}*") {
        edges {
          node {
            id
            title
				handle
            variants(first: 1) {
              edges {
                node {
                  price
                }
              }
            }
            images(first:1) {
					edges{
						node{
                  	url
	 					}
	 				}
            }
          }
        }
      }
    }
  `;
      const data = await executeProductGraphqlQuery(query);
      const products: Product[] = data.products.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        price:
          edge.node.variants.edges.length > 0
            ? edge.node.variants.edges[0].node.price
            : null,
        originalSrc: edge.node.images.edges.length
          ? edge.node.images.edges[0].node.url
          : null,
        displayName: edge.node.handle,
      }));
      console.log(products);
      return products;
    } catch (error) {
      console.error("Error fetching latest products:", error);
      throw error;
    }
  }

  async getProductWithMetafields(productId: any) {
    try {
      const product = await ShopifyService.shopify.product.get(productId, {
        fields:
          "id,title,body_html,product_type,created_at,updated_at,handle,variants, image, images, options",
      });

      const metafields = await ShopifyService.shopify.metafield.list({
        metafield: { owner_resource: "product", owner_id: productId },
        fields: "id, key, value",
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
