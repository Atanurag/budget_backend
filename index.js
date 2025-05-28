const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/user");
const transactionRoutes = require("./routes/transaction");
const budgetRoutes = require("./routes/budget");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/budget", budgetRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Budget Backend API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
