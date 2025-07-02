const express = require("express");
const router = express.Router();

const ctrl = require("./ctrl");

router.get("/", ctrl.output.home);

router.post("/", ctrl.input.home);

module.exports = router;
