const router = require("express").Router();
const funcionario = require("../controllers/funcionario.js");

router.get("/", funcionario.getAll);
router.get("/:id", funcionario.findById);
router.post("/", funcionario.create);
router.delete("/:id", funcionario.delete);

router.get("/", (req, res) => {
  res.sendFile("cadastro.html", {root: './'});
});

module.exports = router
