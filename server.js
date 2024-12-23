const fs = require("fs");
const soap = require("soap");
const express = require("express");
const cors = require("cors");
const app = express();
const xml = fs.readFileSync("myservice.wsdl", "utf-8");

const myService = {
  StockQuoteService: {
    StockQuotePort: {
      GetLastTradePrice: function (args) {
        if (args.tickerSymbol === "trigger error") {
          throw new Error("triggered server error");
        } else {
          return { price: 19.56 };
        }
      },
    },
  },
};

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.get("/api/stockquote/:stock", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log("Server express is running on port 3000");
  const server = soap.listen(app, "/stockquote", myService, xml, function () {
    console.log("server soap initialized");
  });

  server.log = function (type, data, req) {
    console.log(type, data);
  };
});
