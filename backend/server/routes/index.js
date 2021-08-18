const router = require("express").Router();
const companyRoutes = require("./companies");
const dealsRoutes = require("./deals");

router.use("/companies", companyRoutes);
router.use("/deals", dealsRoutes);

module.exports = router;
