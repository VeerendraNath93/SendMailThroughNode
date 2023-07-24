const mongoose = require("mongoose");
const debuglogger = require("../middleware/loggers/debugLogger");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    debuglogger.error({
      status: 500,
      message: `${error.message}`,
    });
  }
};

module.exports = connectDB;
