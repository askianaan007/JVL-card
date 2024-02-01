const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/database");
const { log } = require("console");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shutting down the server due to unHandle rejection error");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shutting down the server due to unCaught exception error");
  server.close(() => {
    process.exit(1);
  });
});
