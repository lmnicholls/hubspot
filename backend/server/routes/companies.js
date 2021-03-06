const router = require("express").Router();
const Company = require("../models/Company");
const Deal = require("../models/Deal");

router.get("/", async (req, res) => {
  const perPage = 5;
  const page = req.query.page || 1;
  const query = {};
  let data = {};
  const sortType = req.query.sortType || "companyName";

  try {
    const companyList = await Company.find({}, { companyName: 1 });
    await Company.find(query)
      .sort({ [sortType]: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("deals")
      .exec((err, companies) => {
        Company.countDocuments(query, (err, count) => {
          if (err) return err;

          data = {
            companies: companies,
            companyList: companyList,
            count: count,
          };

          if (data.count === 0) {
            return res.status(404).send("No companies in database");
          } else {
            res.status(200).send(data);
          }
        });
      });
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
    city: req.body.city || null,
    state_region: req.body.state || null,
    postalCode: req.body.postalCode || null,
    logo: req.body.logo || null,
    industry: req.body.industry || null,
  });

  try {
    const savedNewCompany = await newCompany.save();

    res.status(200).send(savedNewCompany);
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

//edit company details
router.put("/:companyID", async (req, res) => {
  if (!req.body.companyName) {
    return res.status(400).send("Name field is required.");
  }

  if (!req.body.owner) {
    return res.status(400).send("Company owner field is required.");
  }

  if (!req.body.phone) {
    return res.status(400).send("Phone number field is required.");
  }
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

//DELETE company
router.delete("/:companyID", async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyID);

    //deletes company
    await Company.deleteOne({ _id: company._id });

    //deletes any deal associated with that company
    await Deal.deleteMany({ company: company._id });

    res.status(200).send(`${company.companyName} has been deleted.`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
