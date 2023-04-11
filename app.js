'use strict';

const express = require('express')
const lib = require("./lib/metrics");
const app = express();

const port = 8080;
const host = '0.0.0.0';

app.get('/', (req, res) => {
  res.send('V2***Hello World from IBM Cloud Essentials!');
})
lib.exportMetrics(app)
app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
