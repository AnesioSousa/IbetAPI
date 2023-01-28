const router = require("express").Router();
const deposito = require("../controllers/deposito.js");

router.post("/", deposito.create);
router.get("/:id", deposito.getAllByApostador)

module.exports = router