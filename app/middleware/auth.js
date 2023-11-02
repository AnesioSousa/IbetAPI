const jwt = require("jsonwebtoken");
const { promisify } = require("util");

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
