const Apostador = require("../models/apostador.js");
const Endereco = require("../models/endereco.js");
const Pessoa = require("../models/pessoa.js");
const utils = require("../utils/utils.js");


/**
 * Create and save a new Apostador
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
      const new_Apostador = new Apostador ({
        idPessoa: data_pessoa.id,
        saldo: 0
        });
      const new_Endereco = new Endereco ({
          idPessoa: data_pessoa.id, 
          codigoPostal: req.body.codigoPostal, 
          logradouro: req.body.logradouro, 
          numero: req.body.numero, 
          complemento: req.body.complemento, 
          bairro: req.body.bairro, 
          cidade: req.body.cidade, 
          estado: req.body.estado, 
          pais: req.body.pais});
      Apostador.create(new_Apostador, (err_apostador, data) =>{
        if (err_apostador) {
          res.status(500).send({
            message:
            err_apostador.message || "Algum erro ocorreu na criação do Apostador"
          });
        }
      });
      Endereco.create(new_Endereco, (err_endereco, data) =>{
        if (err_endereco) {
          res.status(500).send({
            message:
            err_endereco.message || "Algum erro ocorreu na criação do Endereco"
          });
        }
      });
      res.send(data_pessoa);}});
};

exports.delete = (req, res) => {
  if (utils.isEmptyObject(req.params)) {   //Verifica se o body não é vazio
    res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }

  Apostador.delete(req.params.id, (err, data) => {
    if (err) {
      if(err.kind === "not_found"){
        res.status(404).send({
          message: `An Apostador with the given id ${req.params.id} was not found.`
        });
      }else{
        res.status(500).send({
          message:  "It was not possible to find a Apostador with the given id." + req.params.id
        });
      }
    } else res.send({message: `The Apostador was deleted successfully ${req.params.id}.`});
  });
};

exports.getAll = (req, res) => {
  Apostador.getAll((err, data) => {
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

  Apostador.findById(id, (err, data) => {
      if(err) {
          if(err.kind === "not_found"){
            res.status(404).send({
              message: `An Apostador with the given id '${id}' was not found.`
            })
          }else{
            res.status(500).send({
              message:
                  err.message || "Error retrieving Tutorial with id " + id
            });
          }
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

  Apostador.updateById(req.body.idApostador, edited_pessoa, (err, data) => {
    if (err){
      res.status(500).send({
        message:
            err.message || "Algum erro ocorreu na edição do Time"
      })
    } else res.send(data)
  });
};