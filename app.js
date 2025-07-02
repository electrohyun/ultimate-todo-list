const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000; 

// public 폴더를 브라우저 기준 /로 설정하겠다.
app.use(express.static(`${__dirname}/public`));

const indexRouter = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", indexRouter);

module.exports = app;
