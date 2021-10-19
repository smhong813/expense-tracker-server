const express = require("express");
const router = express.Router();

const expenseRouter = require("./expense");
router.use("/expenses", expenseRouter);

module.exports = router;
