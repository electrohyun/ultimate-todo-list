const express = require("express");
const app = express();

const PORT = 3000;

// public 폴더를 브라우저 기준 /로 설정하겠다.
app.use(express.static(`${__dirname}/public`));

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

module.exports = app;
