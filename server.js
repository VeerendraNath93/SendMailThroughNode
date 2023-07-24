const debuglogger = require("./src/api/middleware/loggers/debugLogger");
const app = require("./src/api/app");
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  debuglogger.info(`Server running on port ${PORT}`);
});

