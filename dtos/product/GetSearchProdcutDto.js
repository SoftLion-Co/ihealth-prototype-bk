module.exports = class GetSearchProdcutDto {
	id;
	displayName;
	title;
	price;
	originalSrc;
 
	constructor(model) {
	   this.id = model.id;
	   this.displayName = model.displayName;
	   this.price = model.variants[0].price;
	   this.lastName = model.lastName;
	   this.originalSrc = model.image.src;
	}
 };