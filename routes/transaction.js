const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount || !type || !category || !date) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    const existingTransaction = await Transaction.findOne({
      userId: req.user.userId,
      type,
      category,
      date,
    });

    if (existingTransaction) {
      return res.status(200).json({
        status: "error",
        message:
          "Transaction with this type, category, and date already exists",
        data: existingTransaction,
      });
    }

    const transaction = new Transaction({
      userId: req.user.userId,
      title,
      amount,
      type,
      category,
      date,
    });

    await transaction.save();

    res.status(201).json({
      status: "success",
      message: "Transaction added",
      data: transaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});


router.post("/summary", auth, async (req, res) => {
  try {
    const { date } = req.body;

    if (!date || !/^\d{4}\/\d{1,2}$/.test(date)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid date format. Use YYYY/M or YYYY/MM",
      });
    }

    const transactions = await Transaction.find({
      userId: req.user.userId,
      date,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((txn) => {
      if (txn.type === "income") totalIncome += txn.amount;
      else if (txn.type === "expense") totalExpense += txn.amount;
    });

    const balance = totalIncome > totalExpense ? totalIncome - totalExpense : 0;

    res.status(200).json({
      status: "success",
      month: date,
      totalIncome: totalIncome || 0,
      totalExpense: totalExpense || 0,
      balance: balance || 0,
    });
  } catch (error) {
    console.error("Error fetching monthly summary:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.post("/txn-details", auth, async (req, res) => {
  try {
    const { date } = req.body;

    if (!date || !/^\d{4}\/\d{1,2}$/.test(date)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid date format. Use YYYY/M or YYYY/MM",
      });
    }

    const transactions = await Transaction.find({
      userId: req.user.userId,
      date,
    });

    const income = transactions.filter((txn) => txn.type === "income");
    const expense = transactions.filter((txn) => txn.type === "expense");

    res.status(200).json({
      status: "success",
      message: `Income and expense transactions for ${date}`,
      income: income.length > 0 ? income : [],
      expense: expense.length > 0 ? expense : [],
    });
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", data: transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});


router.get("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found",
      });
    }

    if (transaction.userId.toString() !== req.user.userId) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }

    res.status(200).json({ status: "success", data: transaction });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ status: "error", message: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user.userId) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }

    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.date = date || transaction.date;

    await transaction.save();

    res.status(200).json({
      status: "success",
      message: "Transaction updated",
      data: transaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ status: "error", message: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user.userId) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }

    await transaction.deleteOne();

    res.status(200).json({ status: "success", message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

module.exports = router;
