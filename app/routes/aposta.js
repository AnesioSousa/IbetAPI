const router = require("express").Router();
const aposta = require("../controllers/aposta.js");

router.get("/:id", aposta.getAllByApostador);
router.post("/", aposta.create);
router.delete("/:id", aposta.delete);

module.exports = router