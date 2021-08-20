const router = require("express").Router();
const Company = require("../models/Company");
const Deal = require("../models/Deal");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//gets all deals for a given user
router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find({}).populate("company");
    res.status(200).send(deals);
  } catch (err) {
    res.status(400).send(err);
  }
});

//posts a deal based on company search by name
router.post("/", async (req, res) => {
  if (!req.body.user) {
    return res.status(400).send("User must be logged in.");
  }

  if (!req.body.name) {
    return res.status(400).send("Name field is required.");
  }

  if (!req.body.stage.status) {
    return res.status(400).send("Stage status field is required.");
  }

  if (!req.body.amount) {
    return res.status(400).send("Amount field is required.");
  }

  try {
    const company = await Company.findOne({
      companyName: req.body.companyName,
    });

    const newDeal = new Deal({
      user: req.body.user,
      name: req.body.name,
      stage: {
        status: req.body.status || "Initiated",
      },
      amount: req.body.amount,
      company: company._id,
      expectedCloseDate: req.body.expectedCloseDate,
    });

    await newDeal.save();

    //adds new deal to deals array for company
    await Company.findByIdAndUpdate(
      company._id,
      { $addToSet: { deals: newDeal } },
      (err, company) => {
        if (err) {
          return res.send(err);
        }
      }
    );
    res.status(200).send(newDeal);
  } catch (err) {
    res.status(400).send(err);
  }
});

//put /:id to update deal stage
router.put("/:dealID", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.dealID);

    if (!req.body.stage.status) {
      return res.status(400).send("Stage status feild is required.");
    }
    const prevStage = deal.stage.status;

    //pushes prev stage to stageHistoy and updates stage.staus with current stage
    //not sure if this is needed??
    const update = {
      $addToSet: { stageHistory: prevStage },
      stage: { status: req.body.stage.status },
    };

    await Deal.findByIdAndUpdate(
      req.params.dealID,
      update,
      { new: true },
      (err, deal) => {
        if (err) {
          return res.send(err);
        } else {
          res.status(200).send(deal);
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

//PUT /:id/edit
//edit deal details

module.exports = router;
