const express = require("express");
const {investmentScheduler, referralSchedular} = require("./src/scheduler/scheduler");
const db = require("./src/Db/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const apis = require("./src/routes/userRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", apis);

investmentScheduler();
referralSchedular();

app.listen(process.env.PORT, () => {
  console.log("server started.");
});
