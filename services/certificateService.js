const { executeGraphqlQuery } = require("../generic/service/graphQLService");

class CertificateService {
  async getCertificateById(Id) {
    const query = `
      {
        giftCard(id: "gid:\/\/shopify\/GiftCard\/${Id}") {
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
      return data.certificate;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const certificateService = new CertificateService();
module.exports = certificateService;
