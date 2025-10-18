const authRoutes = require("./src/routes/authRoutes.js");
const menuRoutes = require("./src/routes/menuRoutes.js");
//const orderRoutes = require("./src/routes/orderRoutes.js");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
//app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
