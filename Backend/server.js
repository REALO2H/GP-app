const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const predictionRoutes = require("./routes/predictionRoutes");
app.use("/api/predictions", predictionRoutes);

app.listen(process.env.PORT || 5002, () => {
  console.log(`🚀 Express server running on port ${process.env.PORT || 5002}`);
});
