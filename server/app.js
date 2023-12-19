const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const appConfig = require("./config/config");
const getConnection = require("./config/db");
const conn = getConnection();

const router = require("./routes/index.route");
const studentRouter = require("./routes/student.route");
const courseRouter = require("./routes/course.route");
const registrationRouter = require("./routes/registration.route");

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
app.use("/", router);
app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/registrations", registrationRouter);

// server activation
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running on PORT ", process.env.SERVER_PORT);
  // console.log("");
});
