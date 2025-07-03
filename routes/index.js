const express = require("express");
const router = express.Router();

const ctrl = require("./ctrl");

router.get("/", ctrl.output.home);
router.get("/todos", ctrl.output.todos);

router.post("/", ctrl.input.home);

router.delete("/todos/:id", ctrl.input.remove);

router.patch("/todos/:id", ctrl.input.update);

module.exports = router;
