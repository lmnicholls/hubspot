const router = require("express").Router();
const Company = require("../models/Company");

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find({});
    if (!companies) {
      res.status(401).send("No companies in database.");
    }
    res.status(200);
    res.send(companies);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  //needs validation
  const newCompany = new Company({
    name: req.body.name,
    companyOwner: req.body.companyOwner,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    logo: req.body.logo,
    industry: req.body.industry,
  });

  try {
    await newCompany.save();
    //for testing puposes get back company._id
    //does frontend need anything back when saving company?
    res.status(200).send({ newCompany: newCompany._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:companyID", async (req, res) => {
  try {
    const company = await Company.findById({ _id: req.params.companyID });
    res.status(200).send(company);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
