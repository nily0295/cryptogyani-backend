const WAZIRX_HOST = `https://api.wazirx.com`;
import fetch from "node-fetch";


export function getTickers(res) {
  var api_path = `/sapi/v1/tickers/24hr`;
  var url = `${WAZIRX_HOST}${api_path}`;
  let exchange = getExchange();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "get",
    })
      .then((res) => res.json())
      .then(async (json) => {
        await Object.values(json).map((data) => {
          switch (data.quoteAsset) {
            case "btc":
              data["eq_inr"] = data.lastPrice * exchange.btcinr;
              break;
            case "wrx":
              data["eq_inr"] = data.lastPrice * exchange.wrxinr;
              break;
            case "usdt":
              data["eq_inr"] = data.lastPrice * exchange.usdtinr;
              break;
            case "inr":
              data["eq_inr"] = data.lastPrice;
              break;
          }
        });

        json = Object.values(json).reduce((result, currentValue) => {
          if (!result[currentValue["baseAsset"]]) {
            result[currentValue["baseAsset"]] = [];
          }
          result[currentValue["baseAsset"]].push(currentValue);
          return result;
        }, {});

        res.send(json);
      })
      .catch((err) => console.log(err));
  });
}

export function getExchange() {
  var exchange = {};
  var result = {};
  var api_path = `/sapi/v1/tickers/24hr`;
  var url = `${WAZIRX_HOST}${api_path}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "get",
      json: true,
    })
      .then((res) => res.json())
      .then(async (json) => {
        result = await Object.values(json).filter((data) => {
          return (
            data["symbol"] == "usdtinr" ||
            data["symbol"] == "btcinr" ||
            data["symbol"] == "wrxinr"
          );
        });
        result.forEach((data) => {
          exchange[data.symbol] = data.lastPrice;
        });
        resolve(exchange);
      })
      .catch((err) => console.log(err));
  });
};
