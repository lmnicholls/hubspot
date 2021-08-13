const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("hello from the companies");
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
