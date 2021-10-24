const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

/**
 * @typedef {Object} PlainExpense
 * @property {string} description The content of expense
 * @property {number} amount      The amount of expense
 * @property {string} date        The date of expense (YYYY-MM-DD)
 */

/**
 * @typedef {Object} Expense
 * @property {string} _id         The auto-generated id from DB
 * @property {string} description The content of expense
 * @property {number} amount      The amount of expense
 * @property {string} date        The date of expense (YYYY-MM-DD)
 * @property {string} createdAt   The datetime that an expense is inserted into DB
 */

// Expense schema definition
const expenseSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  __v: { type: Number, select: false },
});

/* Static functions  */

/**
 * Query all expenses from DB
 * @returns {Expense[]} desc-sorted array which contains all expenses
 */
expenseSchema.statics.getAllExpenses = function () {
  return this.find({}).sort({ date: "desc" });
};

/**
 * Add a new expense to DB
 * @param {PlainExpense} expense an expense to add
 * @returns {Expense} Added expense from the DB
 */
expenseSchema.statics.addExpense = function (expense) {
  // It doesn't check a duplication, because the model "Expense" doesn't have any other unique key except _id.
  const newExpense = new this(expense);
  return newExpense.save();
};

/**
 * Update an expense in DB by ID
 * @param {PlainExpense} expense an expense to update
 * @returns {Expense} Updated expense from the DB
 */
expenseSchema.statics.updateExpenseById = function (id, expense) {
  return this.findOneAndUpdate({ _id: id }, expense, {
    new: true,
  });
};

/**
 * Delete an expense from DB by ID
 * @param {number} id
 * @returns {object} This object has a deletedCount property that indicates the number of deleted document
 */
expenseSchema.statics.deleteExpenseById = async function (id) {
  const result = this.deleteOne({ _id: id });
  return result;
};

/* hook methods  */

/*
  These are for handling errors from MongoDB and making new Error object with a custom message because th error message is displayed on frontend.

  In this case I used the same user-friendly message but I wanted to make sure that I know a duty and way to break down through the switch statement int the first function.
*/
const ERROR_MESSAGE_COMMON = "Please try it later.";
const ERROR_MESSAGE_VALIDATION = "Please check if you have entered all fields.";

expenseSchema.post("save", function (error, res, next) {
  if (error.name === "ValidationError") {
    next(new Error(ERROR_MESSAGE_VALIDATION));
  } else {
    next(new Error(ERROR_MESSAGE_COMMON));
  }
});
expenseSchema.post("findOneAndUpdate", function (error, res, next) {
  next(new Error(ERROR_MESSAGE_COMMON));
});
expenseSchema.post("deleteOne", function (error, res, next) {
  next(new Error(ERROR_MESSAGE_COMMON));
});

module.exports = mongoose.model("Expense", expenseSchema);
