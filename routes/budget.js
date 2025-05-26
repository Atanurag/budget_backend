const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { amount, date, title } = req.body;

    if (!amount || !date || !title) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    const existingBudget = await Budget.findOne({
      userId: req.user.userId,
      date,
    });

    if (existingBudget) {
      return res.status(200).json({
        status: "error",
        message: "Budget for this month and year already exists",
      });
    }

    const budget = new Budget({
      userId: req.user.userId,
      amount,
      date,
      title,
    });

    await budget.save();

    res
      .status(201)
      .json({ status: "success", message: "Budget added", data: budget });
  } catch (error) {
    console.error("Error adding budget:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.post("/budget-by-date", auth, async (req, res) => {
  try {
    const { date } = req.body;

    if (!date || !/^\d{4}\/\d{1,2}$/.test(date)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid date format. Use YYYY/M or YYYY/MM",
      });
    }

    const budgets = await Budget.find({
      userId: req.user.userId,
      date,
    });

    res.status(200).json({
      status: "success",
      message: `Budgets for ${date}`,
      data: budgets,
    });
  } catch (error) {
    console.error("Error fetching budgets by date:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// @route   GET /api/budgets/:id
// @desc    Get a specific budget by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        status: "error",
        message: "Budget not found",
      });
    }

    if (budget.userId.toString() !== req.user.userId) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }

    res.status(200).json({ status: "success", data: budget });
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: "success", data: budgets });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { amount, date, title } = req.body;

    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res
        .status(404)
        .json({ status: "error", message: "Budget not found" });
    }

    if (budget.userId.toString() !== req.user.userId) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }

    budget.amount = amount !== undefined ? amount : budget.amount;
    budget.date = date !== undefined ? date : budget.date;
    budget.title = title !== undefined ? title : budget.title;

    await budget.save();

    res
      .status(200)
      .json({ status: "success", message: "Budget updated", data: budget });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res
        .status(404)
        .json({ status: "error", message: "Budget not found" });
    }

    if (budget.userId.toString() !== req.user.userId) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }

    await budget.deleteOne();

    res.status(200).json({ status: "success", message: "Budget deleted" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

module.exports = router;
