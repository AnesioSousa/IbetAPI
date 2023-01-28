const Administrador = require("../models/administrador.js");
const Endereco = require("../models/endereco.js");
const Pessoa = require("../models/pessoa.js");
const utils = require("../utils/utils.js");


/**
 * Create and save a new Administrador
 * @param {*} req Request
 * @param {JSON} res Response
 */
exports.create = (req, res) => {

  if (utils.isEmptyObject(req.body)) {   //Verifica se o body não é vazio
    res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }

  const new_pessoa = new Pessoa({
    nome: req.body.nome,
    telefone: req.body.telefone,
    email: req.body.email,
    dataNascimento: req.body.dataNascimento,
    username: req.body.username,
    senha: req.body.senha,
    cpf: req.body.cpf
  });

  Pessoa.create(new_pessoa, (err_pessoa, data_pessoa) => {
    if (err_pessoa) {
      res.status(500).send({
        message:
          err_pessoa.message || "Algum erro ocorreu na criação da Pessoa"
      });
    }
    else {
      const new_Administrador = new Administrador ({idPessoa: data_pessoa.id});
      Administrador.create(new_Administrador, (err_administrador, data) =>{
        if (err_administrador) {
          res.status(500).send({
            message:
            err_administrador.message || "Algum erro ocorreu na criação do Administrador"
          });
        }
      });
      res.send(data_pessoa);}});
};

exports.delete = (req, res) => {

  if (utils.isEmptyObject(req.body)) {   //Verifica se o body não é vazio
    res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }

  Administrador.delete(req.body.idAdministrador, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu na exclusão"
      });
    } else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Administrador.getAll((err, data) => {
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

  Administrador.findById(id, (err, data) => {
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

  const edited_pessoa = new Pessoa({
    nome: req.body.nome,
    telefone: req.body.telefone,
    dataNascimento: req.body.dataNascimento,
    cpf: req.body.cpf
  }); 

  Administrador.updateById(req.body.idAdministrador, edited_pessoa, (err, data) => {
    if (err){
      res.status(500).send({
        message:
            err.message || "Algum erro ocorreu na edição do Time"
      })
    } else res.send(data)
  });
};