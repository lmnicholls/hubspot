const router = require("express").Router();
const companyRoutes = require("./companies");
const dealsRoutes = require("./deals");

router.use("/api/companies", companyRoutes);
router.use("/api/deals", dealsRoutes);

module.exports = router;
