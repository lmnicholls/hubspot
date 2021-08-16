const router = require("express").Router();
const Company = require("../models/Company");

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find({});
    if (companies.length === 0) {
      return res.status(404).send("No companies in database.");
    }
    res.status(200);
    res.send(companies);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Name field is required.");
  }

  if (!req.body.companyOwner) {
    return res.status(400).send("Company owner field is required.");
  }

  if (!req.body.phoneNumber) {
    return res.status(400).send("Phone number field is required.");
  }

  const newCompany = new Company({
    name: req.body.name,
    companyOwner: req.body.companyOwner,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city || "",
    state: req.body.state || "",
    postalCode: req.body.postalCode || "",
    logo: req.body.logo || "",
    industry: req.body.industry || "",
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

router.put("/:companyID", async (req, res) => {
  try {
    const update = { ...req.body };
    await Company.findOneAndReplace(
      { _id: req.params.companyID },
      update,
      { new: true },
      (err, doc) => {
        if (err) {
          return err;
        } else {
          res.send(doc);
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
