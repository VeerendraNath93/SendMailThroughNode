const allowedOrigins = require("./allowedOrigins");
const debuglogger = require("../middleware/loggers/debugLogger");
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
    //   callback(new Error("Not allowed by CORS"));
      debuglogger.error({
        status: 500,
        message: `Not allowed by CORS`,
      });
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
