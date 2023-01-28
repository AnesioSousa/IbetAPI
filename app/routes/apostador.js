const router = require("express").Router();
const apostador = require("../controllers/apostador.js");

router.get("/", apostador.getAll);
router.get("/:id", apostador.findById);
router.post("/", apostador.create);
router.delete("/:id", apostador.delete);

module.exports = router

 