const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("hello from the companies");
});

module.exports = router;
