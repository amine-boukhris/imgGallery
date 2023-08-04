const express = require("express");
// const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");

// connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());
app.use("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
