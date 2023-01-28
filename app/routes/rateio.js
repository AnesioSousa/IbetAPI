const router = require("express").Router();
const rateio = require("../controllers/rateio.js");

router.post("/", rateio.create);

module.exports = router