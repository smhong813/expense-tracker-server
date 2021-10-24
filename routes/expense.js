const express = require("express");
const router = express.Router();
const Expense = require("../schemas/expense");

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Retrieve a list of expenses
 *     tags: [Expense]
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Expense'
 */

router.get("/", async (req, res, next) => {
  try {
    const expenses = await Expense.getAllExpenses();
    res.json(expenses);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expense]
 *     parameters:
 *     - in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Expense'
 *
 *
 *     responses:
 *       200:
 *         description: An added expense object
 *         schema:
 *           $ref: '#/definitions/Expense'
 */

router.post("/", async (req, res, next) => {
  try {
    const newExpense = await Expense.addExpense(req.body);
    res.json(newExpense);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /expenses/{id}:
 *   patch:
 *     summary: Edit a expense by ID
 *     tags: [Expense]
 *     parameters:
 *     - in: path
 *       required: true
 *       name: "id"
 *       description: "ID of expense to update"
 *     - in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Expense'
 *
 *
 *     responses:
 *       200:
 *         description: An edited expense object
 *         schema:
 *           $ref: '#/definitions/Expense'
 */
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

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expense]
 *     parameters:
 *     - in: path
 *       required: true
 *       name: "id"
 *       description: "ID of expense to delete"
 *
 *
 *     responses:
 *       200:
 *         description: The count of deleted expense
 *         schema:
 *           type: object
 *           properties:
 *             deletedCount:
 *               type: integer
 *
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteResult = await Expense.deleteExpenseById(req.params.id);
    if (deleteResult.deletedCount !== 1) {
      throw new Error("Couldn't delete the expense");
    }
    res.json(deleteResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
