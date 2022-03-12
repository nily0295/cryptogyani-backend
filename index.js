const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.use(express.json());

const port = 3000;
const WAZIRX_HOST = `https://api.wazirx.com`;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/tickers/:inr", async (req, res) => {
  res.send(0);
});

app.get("/exchange", async (req, res) => {
  res.send(await getExchange());
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
