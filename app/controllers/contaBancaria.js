const ContaBancaria = require("../models/contaBancaria.js");

/**
 * Create and save a new Conta Bancaria
 * @param {*} req Request
 * @param {JSON} res Response
 */

exports.create = (req, res) => {

    if (utils.isEmptyObject(req.body)) {   //Verifica se o body não é vazio
      res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
      });
    }
  
  const new_contaBancaria = new ContaBancaria({
	  idApostador: req.body.idApostador,
    banco: req.body.banco,
	  agencia: req.body.agencia,
	  tipo: req.body.tipo,
	  conta: req.body.conta,
	  digito: req.body.digito,
	  variacao: req.body.variacao,
	  titular: req.body.titular
  });
    
  ContaBancaria.create(new_contaBancaria, (err, data) => {
      if (err){
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu na criação da Conta Bancaria"
        })
      }
      res.send(data);
});
};

exports.delete = (req, res) => {

    if (utils.isEmptyObject(req.body)) {   //Verifica se o body não é vazio
      res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
      });
    }
  
    ContaBancaria.delete(req.body.idContaBancaria, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu na exclusão"
        });
      } else res.send(data);
    });
};

exports.getAll = (req, res) => {
    ContaBancaria.getAll((err, data) => {
      if(err) {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu na exclusão"
          });
      } else res.send(data);
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  if (utils.isEmptyObject(req.params)) {   //Verifica se o body não é vazio
    res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }

  ContaBancaria.findById(id, (err, data) => {
    if(err) {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu na exclusão"
        });
    } else res.send(data);
});
};

exports.updateById = (req, res) => {
  if (utils.isEmptyObject(req.body)) {   //Verifica se o body não é vazio
    res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }

  const edited_contaBancaria = new ContaBancaria({
    banco: req.body.banco,
	  agencia: req.body.agencia,
	  tipo: req.body.tipo,
	  conta: req.body.conta,
	  digito: req.body.digito,
	  variacao: req.body.variacao,
	  titular: req.body.titular
  }); 

  ContaBancaria.updateById(req.body.idContaBancaria, edited_contaBancaria, (err, data) => {
    if (err){
      res.status(500).send({
        message:
            err.message || "Algum erro ocorreu na edição da Conta"
      })
    } else res.send(data)
  });
};
