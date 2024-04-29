const { executeGraphqlQuery } = require("../generic/service/graphQLService");

interface Paragraph {
	id:string;
	displayName: string;
	type: string;
	text?: string;
	subheading?: string;
	image?: Image | null;
 }
 
 interface BlogPost {
	id:string;
	category: string;
	heading: string;
	displayName: string;
	description: string;
	paragraphs: Paragraph[];
 }
 
 interface Blog {
	id:string;
	displayName: string;
	category: string;
	date: string;
	image: Image;
	english: BlogPost;
	ukrainian: BlogPost;
 }

 interface Image {
	originalSrc: string;
 }

class BlogService {

//TODO Update fubction to db Blog

  async getBlogById(Id: string) {
	const query = `
	{
	  metaobject(id: "gid:\/\/shopify\/Metaobject\/${Id}") {
			id,
			displayName,
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
								... on Metaobject{
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
	 const data = await executeGraphqlQuery(query);
	const blog: Blog = {
			id: data.metaobject.id,
			displayName: data.metaobject.displayName,
			category: data.metaobject.fields.find((field:any)=>field.key==="category")?.value||null,
			date: data.metaobject.fields.find((field:any)=>field.key==="date")?.value||null,
			image: { originalSrc: data.metaobject.fields.find((field:any) => field.key === "image")?.reference?.image?.originalSrc || null },
			english: await this.transformToBlogPost(data.metaobject.fields.find((field:any) => field.key === "english")?.reference||null),
			ukrainian: await this.transformToBlogPost(data.metaobject.fields.find((field:any) => field.key === "ukrainian")?.reference||null),
		 };

	   return blog;
	// return await this.transformToBlog(data.metaobject);
 } catch (error) {
	console.error(error);
	throw error;
 }
		
 }

 async transformToBlogPost(reference:any): Promise<BlogPost> {
	if(reference===null){
	}
	const paragraphsIds = JSON.parse(reference.fields.find((field:any)=>field.key==="paragraphs")?.value||null);
	return {
	  id: reference.id,
	  category: reference.fields.find((field:any)=>field.key==="category")?.value||null,
	  heading: reference.fields.find((field:any) => field.key === "heading")?.value || null,
	  displayName: reference.displayName,
	  description: reference.fields.find((field:any) => field.key === "description")?.value || null,
	  paragraphs:await this.fetchParagraphs(paragraphsIds),
	};
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
	  const paragraphData = await executeGraphqlQuery(paragraphQuery);
	  paragraphs.push(this.transformParagraph(paragraphData.metaobject));
	}
	return paragraphs;
 }

 transformParagraph(paragraphObject:any):Paragraph {
	return {
		id: paragraphObject.id,
		displayName: paragraphObject.displayName,
	  type: paragraphObject.fields.find((field:any) => field.key === 'type')?.value || null,
	  text: paragraphObject.fields.find((field:any) => field.key === 'text')?.value || null,
	  image: paragraphObject.fields.find((field:any) => field.key === "image")?.reference === null ? null : { originalSrc: paragraphObject.fields.find((field:any) => field.key === "image")?.reference?.image?.originalSrc || null },
	  subheading: paragraphObject.fields.find((field:any) => field.key === 'subheading')?.value || null
	};
 }

 async getBlogs(): Promise<Blog[]> {
	const query = `
	{
	  metaobjects(first: 10, type: "blog") {
		 edges {
			node {
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
		const data = await executeGraphqlQuery(query);
	   return data;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
 }
}

const blogService = new BlogService();
module.exports = blogService;
