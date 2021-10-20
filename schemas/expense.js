const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

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
});

expenseSchema.statics.addExpense = function (expense) {
  // It doesn't check a duplication, because the model "Expense" doesn't have any other unique key except _id.
  const newExpense = new this(expense);
  return newExpense.save();
};

expenseSchema.statics.updateExpenseById = function (id, expense) {
  return this.findOneAndUpdate({ _id: id }, expense, {
    new: true,
  });
};

expenseSchema.statics.deleteExpenseById = async function (id) {
  const result = this.deleteOne({ _id: id });
  if (result.deletedCount !== 1) {
    throw new Error("Couldn't delete the expense");
  }
  return result;
};

expenseSchema.statics.getAllExpenses = function () {
  return this.find({}).sort({ date: "desc" });
};

expenseSchema.statics.getExpenseById = function (id) {
  return this.findOne({ _id: id });
};

module.exports = mongoose.model("Expense", expenseSchema);
