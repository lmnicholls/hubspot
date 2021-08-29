const router = require("express").Router();
const Company = require("../models/Company");
const Deal = require("../models/Deal");
const moment = require("moment");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const axios = require("axios");

router.get("/", async (req, res) => {
  //gets all deals for a given user
  let query = {};

  // filter by company _id
  if (req.query.companyID) {
    query.company = req.query.companyID;
  }

  //filter by deal amount
  if (req.query.min && req.query.max) {
    query.amount = { $gt: req.query.min, $lt: req.query.max };
  }

  // filter by date
  if (req.query.filterDay || req.query.filterMonth || req.query.filterYear) {
    if (req.query.filterDay && req.query.filterMonth && req.query.filterYear) {
      let start = moment().startOf("day");
      let end = moment().endOf("day");

      query.lastActivityDate = { $gte: start, $lte: end };
    }
    if (!req.query.filterDay && req.query.filterMonth && req.query.filterYear) {
      let start = moment().startOf("month");
      let end = moment().endOf("month");

      query.lastActivityDate = { $gte: start, $lte: end };
    }
    if (
      !req.query.filterDay &&
      !req.query.filterMonth &&
      req.query.filterYear
    ) {
      let start = moment().startOf("year");
      let end = moment().endOf("year");

      query.lastActivityDate = { $gte: start, $lte: end };
    }
  }

  console.log(query);

  try {
    await Deal.find(query)
      .sort({ amount: -1 })
      .populate("company")
      .exec((err, deals) => {
        if (err) {
          return err;
        } else {
          res.status(200).send(deals);
        }
      });
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

  if (!req.body.status) {
    return res.status(400).send("Stage status field is required.");
  }

  if (!req.body.amount) {
    return res.status(400).send("Amount field is required.");
  }

  try {
    const company = await Company.findById(req.body.companyID);

    if (!company) {
      return res.status(404).send("Company not found.");
    }

    const newDeal = new Deal({
      user: req.body.user,
      name: req.body.name,
      stage: {
        status: req.body.status || "Initiated",
      },
      amount: req.body.amount,
      company: req.body.companyID,
      expectedCloseDate: req.body.expectedCloseDate,
    });

    await newDeal.save();

    const savedDeal = await Deal.findById(newDeal._id).populate("company");

    //adds new deal to deals array for company
    await Company.findByIdAndUpdate(
      req.body.companyID,
      { $addToSet: { deals: newDeal } },
      (err, company) => {
        if (err) {
          return res.send(err);
        }
      }
    );

    const slackBody = {
      mkdwn: true,
      text: `A new deal was added to the board!`,
      attachments: [
        {
          color: "#193753",
          text: `${savedDeal.name} was *${savedDeal.stage.status}* for $${savedDeal.amount} to ${savedDeal.company.companyName} by ${savedDeal.user}.`,
        },
      ],
    };

    await axios.post(
      `https://hooks.slack.com/services/${process.env.SLACK_SECRET}`,
      slackBody
    );

    res.status(200).send(savedDeal);
  } catch (err) {
    res.status(400).send(err);
  }
});

//put /:id to update deal stage for drag and drop
router.put("/:dealID", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.dealID);

    if (!req.body.status) {
      return res.status(400).send("Stage status feild is required.");
    }
    const prevStage = deal.stage.status;

    //pushes prev stage to stageHistoy and updates stage.staus with current stage
    //not sure if this is needed??
    const update = {
      $addToSet: { stageHistory: prevStage },
      stage: { status: req.body.status },
      lastActivityDate: new Date(),
    };

    const dealStatusEdit = await Deal.findByIdAndUpdate(
      req.params.dealID,
      update,
      { new: true },
      (err, deal) => {
        if (err) {
          return res.send(err);
        }
      }
    ).populate("company");

    const slackBody = {
      mkdwn: true,
      text: `A deal status change was added to the board!`,
      attachments: [
        {
          color: "#193753",
          text: `${dealStatusEdit.name} for ${dealStatusEdit.company.companyName} is now *${dealStatusEdit.stage.status}*`,
        },
      ],
    };

    await axios.post(
      `https://hooks.slack.com/services/${process.env.SLACK_SECRET}`,
      slackBody
    );

    res.status(200).send(dealStatusEdit);
  } catch (err) {
    res.status(400).send(err);
  }
});

//edit deal details
router.put("/:dealID/edit", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Name field is required.");
  }

  if (!req.body.stage.status) {
    return res.status(400).send("Stage status field is required.");
  }

  if (!req.body.amount) {
    return res.status(400).send("Amount field is required.");
  }

  if (!req.body.companyName) {
    return res.status(400).send("Company name field is required.");
  }

  try {
    const deal = await Deal.findById(req.params.dealID);
    const companyID = deal.company;
    const update = { ...req.body, company: companyID };

    const dealEdit = await Deal.findOneAndReplace(
      { _id: req.params.dealID },
      update,
      { new: true },
      (err, deal) => {
        if (err) {
          return err;
        }
      }
    ).populate("company");

    res.status(200).send(dealEdit);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:dealID", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.dealID);
    const company = await Company.findById(deal.company);
    const update = { $pull: { deals: deal._id } };

    //deletes deal in deals collection
    await Deal.deleteOne({ _id: deal._id });

    //deletes deal from company deals array in companies collection
    await Company.findByIdAndUpdate(company._id, update, (err, company) => {
      if (err) {
        return err;
      }
    });

    res.status(200).send(`${deal.name} has been deleted.`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
