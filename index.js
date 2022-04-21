const express = require("express");
require("dotenv").config();
const https = require("https");

const app = express();

const server = https.createServer(app);
server.listen(process.env.PORT, () => {
  console.log("Port started");
});