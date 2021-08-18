const router = require("express").Router();
const Company = require("../models/Company");
const Deal = require("../models/Deal");

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find({}).populate("deals");

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
  if (!req.body.companyName) {
    return res.status(400).send("Name field is required.");
  }

  if (!req.body.owner) {
    return res.status(400).send("Company owner field is required.");
  }

  if (!req.body.phone) {
    return res.status(400).send("Phone number field is required.");
  }

  const newCompany = new Company({
    companyName: req.body.companyName,
    owner: req.body.owner,
    phone: req.body.phone,
    city: req.body.city || "",
    state_region: req.body.state || "",
    postalCode: req.body.postalCode || "",
    logo: req.body.logo || "",
    industry: req.body.industry || "",
  });

  try {
    await newCompany.save();

    res.status(200).send(newCompany);
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
    const company = await Company.findById(req.params.companyID);
    const deals = company.deals;
    const update = { ...req.body, deals: deals };

    await Company.findOneAndReplace(
      { _id: req.params.companyID },
      update,
      { new: true },
      (err, doc) => {
        if (err) {
          return err;
        } else {
          res.status(200);
          res.send(doc);
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
