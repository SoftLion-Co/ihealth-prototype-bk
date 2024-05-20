const { executeGraphqlQuery } = require("../generic/service/graphQLService");


class CertificateService {
  async getCertificateById(Id) {
    const query = `
      {
        giftCard(id: "gid:\/\/shopify\/GiftCard\/${Id}") {
          id,
			 code,
			 currency,
			 disabled_at,
			 expires_on,
			 initial_value,
			 order_id,
			 balance,
			 customer,
			 expiresOn,
			 order
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

  async getCertificates() {
	const query = `
	  {
		 giftCard(first: 10) {
			id,
			balance,
			customer,
			expiresOn,
			order
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

const certificateService = new CertificateService();
module.exports = certificateService;
