import express from "express";
import { getExchange, getTickers } from './module.js';
const app = express();
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

app.get("/tickers/", async (req, res) => {
  res.send(await getTickers(res));
});

app.get("/exchange/", async (req, res) => {
  res.send(await getExchange());
});

app.get("/", (req, res) => {
  res.send("WELLCOME TO THE CRYPTOGYANI ARBITRAGE EXPRESS WEBAPP");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
