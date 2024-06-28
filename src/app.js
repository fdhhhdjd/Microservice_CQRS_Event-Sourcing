const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();
require("dotenv").config();

//* GLOBAL
require("./globals/globals");

app.use(morgan("dev"));
app.enable();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

module.exports = app;
