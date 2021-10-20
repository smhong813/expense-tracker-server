const express = require("express");
const router = express.Router();
const Expense = require("../schemas/expense");

router.get("/", async (req, res, next) => {
  try {
    const expenses = await Expense.getAllExpenses();
    res.json(expenses);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const expense = await Expense.getExpenseById(req.params.id);
    res.json(expense);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newExpense = await Expense.addExpense(req.body);
    res.json(newExpense);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updatedExpense = await Expense.updateExpenseById(
      req.params.id,
      req.body
    );
    res.json(updatedExpense);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteResult = await Expense.deleteExpenseById(req.params.id);
    res.json(deleteResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
