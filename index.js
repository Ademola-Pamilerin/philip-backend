const express = require("express");
require("dotenv").config();
const https = require("https");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Ademola");
  console.log("running");
});

const server = https.createServer(app);
server.listen(process.env.PORT, () => {
  console.log("Port started");
});
