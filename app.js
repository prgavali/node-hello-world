'use strict';

const express = require('express')
const lib = require("./lib/metrics");
const app = express();

const port = 8080;
const host = '0.0.0.0';

app.get('/', (req, res) => {
  console.log("accessed /")
  res.send('Hello World from IBM Cloud Essentials!-V1');
})
lib.exportMetrics(app)
app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
