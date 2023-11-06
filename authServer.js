//const apiKey = process.env.API_KEY || 'default-api-key';
const sql = require("./app/models/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const { promisify } = require("util");

const app = express();
const bcrypt = require("bcryptjs");

app.use(express.json());
// parse reqs of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 8);
  console.log(password);

  return res.json({
    erro: false,
    mensagem: "Sign up user",
  });
});

app.post("/login", async (req, res) => {
  try {
    let body = await req.body;

    // Pelo menos um dos campos 'email' ou 'password' é considerado "falsy"
    if (!body.email || !body.password) {
      return res.status(400).json({
        error:
          "Algum campo obrigatório não foi enviado. Por favor verifique os dados e tente novamente.",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  eAdmin: async function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        error: true,
        message:
          "Error: Login required to continue! The token is not being send! A",
      });
    }

    const [, token] = authHeader.split(" ");
    //console.log("Token: " + token);

    if (!token) {
      return res.status(400).json({
        error: true,
        message:
          "Error: Login required to continue! The token is not being send B!",
      });
    }

    try {
      // Checa se o token é válido
      // "@@KJKSZPJ1212" é a assinatura usada em todos os tokens
      const decode = await promisify(jwt.verify)(token, "@@KJKSZPJ1212");
      req.userId = decode.id;
      return next(); // Prossiga!
    } catch (err) {
      return res.status(400).json({
        error: true,
        message: "Error: Login required to continue! Invalid token!",
      });
    }
  },
};

// define a porta e fica a espera de requisições
const PORT = process.env.SERVER_AUTH_PORT;

app.listen(PORT, () => {
  console.log(`O servidor está em execução na porta ${PORT}.`);
});
