const router = require("express").Router();
const administrador = require("../controllers/administrador.js");

router.get("/", administrador.getAll);
router.get("/:id", administrador.findById);
router.post("/", administrador.create);
router.delete("/:id", administrador.delete);

router.get("/", (req, res) => {
  res.sendFile("cadastro.html", {root: './'});
});

module.exports = router
