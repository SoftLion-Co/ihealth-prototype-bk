const certificateService = require("../services/certificate-service");

class CertificateController {
  async getCertificateById(req, res) {
    try {
      const certificate = await certificateService.getCertificateById(
        req.params.id
      );
      res.send(certificate);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

const certificateController = new CertificateController();
module.exports = certificateController;
