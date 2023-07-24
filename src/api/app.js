require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const debuglogger = require("./middleware/loggers/debugLogger");
const corsOptions = require("./config/corsOptions");
// const connectDB = require("./config/dbConn");
// connectDB();

//// Error handler middleware
app.use((err, req, res, next) => {
  debuglogger.error(
    `${500}-${req.originalUrl}-${req.method}-${err.message}-${req.ip}`
  );
  res.status(err.status || 500).send("Internal Server Error");
});
//// Middleware function to log all requests
app.use((req, res, next) => {
  debuglogger.info(`${res.statusCode} ${req.method} ${req.url} ${req.ip}`);
  next();
});

//// cors...
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/", require("./routes/post/contact"));

//// 404 not found .
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//// db connection
mongoose.connection.once("open", () => {
  debuglogger.info("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  debuglogger.error(`${err}`);
});


module.exports = app;

