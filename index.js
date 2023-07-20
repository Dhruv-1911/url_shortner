const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

const bodyParser = require("body-parser");
const connect_db = require("./config/connect");
const urlRoute = require("./router/urlRoute");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* this is use for bootstrap*/
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use("/", urlRoute);

PORT = process.env.PORT;
const start = async () => {
  try {
    //connect database
    await connect_db;
    app.listen(PORT, () => {
      console.log(`listening on ${PORT} port...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
