const router = require("express").Router();
const contaBancaria = require("../controllers/contaBancaria.js");

router.get("/", contaBancaria.getAll);
router.get("/:id", contaBancaria.findById);
router.post("/", contaBancaria.create);
router.delete("/:id", contaBancaria.delete);

module.exports = router
