const router = require("express").Router();
const time = require("../controllers/time.js");
const cors = require('cors')
router.get("/", time.getAll);
router.post("/", time.create);
router.delete("/:id", time.delete);
router.post("/:id", time.updateById);

router.use(cors())
module.exports = router
