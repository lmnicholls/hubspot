const router = require("express").Router();
const Company = require("../models/Company");

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find({});
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
    createdDate: req.body.createdDate, //if date not given it defaults to the date the form was filled out
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

module.exports = router;
