const router = require("express").Router();
const Company = require("../models/Company");
const Deal = require("../models/Deal");

//gets all deals for a given user
router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find({}).populate("company");
    res.status(200).send(deals);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
