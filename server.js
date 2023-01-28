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

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { eAdmin } = require('./app/middleware/auth');
const { faker } = require("@faker-js/faker/locale/pt_BR");

var corsOptions = { origin: "http://localhost:3306" };

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
		id_user: req.userId
	});
})

app.use("/apostador", eAdmin, apostador);
app.use("/administrador", eAdmin, administrador);
app.use("/funcionario", funcionario);
app.use("/time", time)
app.use("/contaBancaria", contaBancaria)
app.use("/rateio", rateio)
app.use("/aposta", aposta)
app.use("/deposito", deposito)
app.use("/saque", saque)

app.post('/signup', async (req, res) => {

	const password = await bcrypt.hash("123456", 8);
	console.log(password);

	return res.json({
		erro: false,
		mensagem: "Sign up user",
	});
});

app.post('/login', async (req, res) => {
	//Tem que vir do banco de dados
	if (req.body.email != "example@gmail.com") {
		return res.status(400).json({
			erro: true,
			mensagem: "Error: Username or password incorrect! e-mail incorrect!"
		});
	}
	//Tem que vir do banco de dados
	if (!(await bcrypt.compare(req.body.password, "$2a$08$YUuYWodvv6OLaJ436Joxa.4/zVinose6urphA09MzBW0HNImE2AEu"))) {
		return res.status(400).json({
			erro: true,
			mensagem: "Error: Username or password incorrect! Password incorrect!"
		});
	}
	//O id vem do banco
	// "@@KJKSZPJ1212" é a assinatura usada em todos os tokens
	let token = jwt.sign({ id: 1 }, "@@KJKSZPJ1212", {
		//expiresIn: 60  //1 minute
		expiresIn: 600  //10 minutes
		//expiresIn: '7d' // 7 days
	});

	return res.json({
		error: false,
		message: "You are successfully logged!",
		token
	});
});

// define a porta e fica a espera de requisições
const PORT = process.env.PORT || 3307;

app.listen(PORT, () => {
	console.log(`O servidor está em execução na porta ${PORT}.`);
});
