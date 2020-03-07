const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");
const app = express();

const engine = require("ejs-mate");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.set("views", path.join(__dirname, "public", "views"));

app.engine("ejs", engine);
app.set("view engine", "ejs");
module.exports = app;
