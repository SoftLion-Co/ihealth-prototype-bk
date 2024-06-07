const { executeGraphqlQuery: executeBlogGraphqlQuery } = require("../generic/service/graphQLService");

interface Paragraph {
  id: string;
  displayName: string;
  type: string;
  text?: string;
  subheading?: string;
  originalSrc?: string;
}

interface BlogPost {
  id: string;
  date: string;
  originalSrc: string;
  category: string;
  heading: string;
  displayName: string;
  description: string;
  paragraphs: Paragraph[];
  previousBlogPost?: {
    date: string;
    originalSrc: string;
    heading: string;
  } | null;
  nextBlogPost?: {
    date: string;
    originalSrc: string;
    heading: string;
  } | null;
  totalComments: number;
}

interface BlogPostShort {
  id: string;
  displayName: string;
  date: string;
  category: string;
  totalComments: number;
  heading: string;
  description: string;
  originalSrc: string;
}

class BlogService {
  async getBlogById(Id: string) {
    const query = `
	{
	  metaobject(id: "gid:\/\/shopify\/Metaobject\/${Id}") {
			id,
			displayName,
			updatedAt,
			fields{
				key,
				value,
				reference {
					... on Metaobject {
						id,
						displayName,
						fields{
							key,
							value,
							reference{
								... on MediaImage{
									image{
										id
										originalSrc
									}
								}
							}
						}
					 }
					... on MediaImage {
					  image {
						 originalSrc
					  }
					}
				}
			}
	  }
	}
 `;
    try {
      const data = await executeBlogGraphqlQuery(query);
      const blogPost: BlogPost = {
        id: data.metaobject.id,
        displayName: data.metaobject.displayName,
        date: data.metaobject.updatedAt,
        category:
          data.metaobject.fields.find((field: any) => field.key === "category")
            ?.value || null,
        originalSrc:
          data.metaobject.fields.find((field: any) => field.key === "image")
            ?.reference?.image?.originalSrc || null,
        heading:
          data.metaobject.fields.find((field: any) => field.key === "heading")
            ?.value || null,
        description:
          data.metaobject.fields.find(
            (field: any) => field.key === "description"
          )?.value || null,
        paragraphs: await this.fetchParagraphs(
          JSON.parse(
            data.metaobject.fields.find(
              (field: any) => field.key === "paragraphs"
            )?.value || "[]"
          )
        ),
        nextBlogPost: null,
        previousBlogPost: null,
        totalComments: 0,
      };

      return blogPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchParagraphs(paragraphIds: string[]): Promise<Paragraph[]> {
    const paragraphs: Paragraph[] = [];
    for (const paragraphId of paragraphIds) {
      const paragraphQuery = `
	  {
		 metaobject(id: "${paragraphId}") {
			id,
			displayName,
			fields {
			  key,
			  value,
			  reference{
				... on MediaImage {
					image {
					  originalSrc
					}
				 }
			  }
			}
		 }
	  }
	  `;
      const paragraphData = await executeBlogGraphqlQuery(paragraphQuery);
      paragraphs.push(this.transformParagraph(paragraphData.metaobject));
    }
    return paragraphs;
  }

  transformParagraph(paragraphObject: any): Paragraph {
    return {
      id: paragraphObject.id,
      displayName: paragraphObject.displayName,
      type:
        paragraphObject.fields.find((field: any) => field.key === "type")
          ?.value || null,
      text:
        paragraphObject.fields.find((field: any) => field.key === "text")
          ?.value || null,
      originalSrc:
        paragraphObject.fields.find((field: any) => field.key === "image")
          ?.reference === null
          ? null
          : paragraphObject.fields.find((field: any) => field.key === "image")
              ?.reference?.image?.originalSrc,
      subheading:
        paragraphObject.fields.find((field: any) => field.key === "subheading")
          ?.value || null,
    };
  }

  async getBlogs() {
    const query = `
	{
	  metaobjects(first: 10, type: "blog_post") {
		 edges {
			node {
			  id,
			  displayName,
			  updatedAt,
			  fields {
				 key,
				 value,
				 reference {
					... on Metaobject {
					  id,
					  displayName,
					  fields {
						 key,
						 value,
						 reference {
							... on Metaobject {
							  id,
							  displayName,
							  fields {
								 key,
								 value,
								 reference {
									... on MediaImage {
									  image {
										 id
										 originalSrc
									  }
									}
								 }
							  }
							}
						 }
					  }
					}
					... on MediaImage {
					  image {
						 originalSrc
					  }
					}
				 }
			  }
			}
		 }
	  }
	}
	`;
    try {
      const data = await executeBlogGraphqlQuery(query);
      const blogPosts: BlogPost[] = [];

      for (const edge of data.metaobjects.edges) {
        const node = edge.node;
        const blogPost: BlogPost = {
          id: node.id,
          displayName: node.displayName,
          date: node.updatedAt,
          category:
            node.fields.find((field: any) => field.key === "category")?.value ||
            null,
          originalSrc:
            node.fields.find((field: any) => field.key === "image")?.reference
              ?.image?.originalSrc || null,
          heading:
            node.fields.find((field: any) => field.key === "heading")?.value ||
            null,
          description:
            node.fields.find((field: any) => field.key === "description")
              ?.value || null,
          paragraphs: await this.fetchParagraphs(
            JSON.parse(
              node.fields.find((field: any) => field.key === "paragraphs")
                ?.value || "[]"
            )
          ),
          nextBlogPost: null,
          previousBlogPost: null,
          totalComments: 0,
        };

        blogPosts.push(blogPost);
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getLatestBlogPosts() {
    const query = `
	  {
		 metaobjects(first: 2, type: "blog_post", sortBy: "CREATED_AT_DESC") {
			edges {
			  node {
				id,
				displayName,
				updatedAt,
				fields {
				  key,
				  value,
				  reference {
					 ... on Metaobject {
						id,
						displayName,
						fields {
						  key,
						  value,
						  reference {
							 ... on Metaobject {
								id,
								displayName,
								fields {
								  key,
								  value,
								  reference {
									 ... on MediaImage {
										image {
										  id
										  originalSrc
										}
									 }
								  }
								}
							 }
						  }
						}
					 }
					 ... on MediaImage {
						image {
						  originalSrc
						}
					 }
				  }
				}
			 }
		  }
		}
	 }
	`;

    try {
      const data = await executeBlogGraphqlQuery(query);
      const blogPosts: BlogPostShort[] = [];

      for (const edge of data.metaobjects.edges) {
        const node = edge.node;
        const blogPost: BlogPostShort = {
          id: node.id,
          displayName: node.displayName,
          date: node.updatedAt,
          category:
            node.fields.find((field: any) => field.key === "category")?.value ||
            null,
          originalSrc:
            node.fields.find((field: any) => field.key === "image")?.reference
              ?.image?.originalSrc || null,
          heading:
            node.fields.find((field: any) => field.key === "heading")?.value ||
            null,
          description:
            node.fields.find((field: any) => field.key === "description")
              ?.value || null,
          totalComments: 0,
        };

        blogPosts.push(blogPost);
      }

      return blogPosts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const blogService = new BlogService();
module.exports = blogService;
