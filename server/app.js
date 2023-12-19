const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const appConfig = require("./config/config");
const getConnection = require("./config/db");
const conn = getConnection();

const app = express();
morgan.token(
  "custom",
  "Request: :method \nFor URL: :url \nResponse Time: :total-time[2] milliseconds"
);

// middleware
app.use((req, res, next) => {
  req.conn = conn;
  next();
});

// init
app.use(cors());
app.use(express.json());
app.use(morgan("custom"));

// router

// server activation
app.listen(process.env.REACT_APP_DB_PORT, () => {
  console.log("Server is running on PORT 8000");
  // console.log("");
});
