const express = require("express");
const router = express.Router();

// expenseRouter uses the path started with /expenses
const expenseRouter = require("./expense");
router.use("/expenses", expenseRouter);

module.exports = router;
