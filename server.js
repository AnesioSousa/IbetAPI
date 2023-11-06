require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const apostador = require("./app/routes/apostador.js");
const aposta = require("./app/routes/aposta.js");
const administrador = require("./app/routes/administrador.js");
const funcionario = require("./app/routes/funcionario.js");
const time = require("./app/routes/time.js");
const contaBancaria = require("./app/routes/contaBancaria.js");
const rateio = require("./app/routes/rateio.js");
const deposito = require("./app/routes/deposito.js");
const saque = require("./app/routes/saque.js");

const { eAdmin } = require("./app/middleware/auth");
const { faker } = require("@faker-js/faker/locale/pt_BR");

const corsOptions = {
  origin: ["http://localhost:5500", "http://localhost:3309"],
};

app.use(cors(corsOptions));

// parse reqs of content-type - application/json
app.use(express.json());

// parse reqs of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//ROTAS
// É só colocar "eAdmin" como parâmetro na rota que precisa de segurança

app.get("/", eAdmin, async (req, res) => {
  res.json({
    mensagem: "Welcome to IBet",
    id_user: req.userId,
  });
});

app.use("/apostador", eAdmin, apostador);
app.use("/administrador", eAdmin, administrador);
app.use("/funcionario", funcionario);
app.use("/time", time);
app.use("/contaBancaria", contaBancaria);
app.use("/rateio", rateio);
app.use("/aposta", aposta);
app.use("/deposito", deposito);
app.use("/saque", saque);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`O servidor está em execução na porta ${PORT}.`);
});
