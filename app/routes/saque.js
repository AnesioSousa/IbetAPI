const router = require("express").Router();
const saque = require("../controllers/saque.js");

router.post("/", saque.create);
router.get("/:id", saque.getAllByApostador)

module.exports = router