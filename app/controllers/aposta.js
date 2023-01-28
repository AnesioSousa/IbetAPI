const Aposta = require("../models/aposta.js");
const utils = require("../utils/utils.js");
now = new Date;

/**
 * Create and save a new Apostador
 * @param {*} req Request
 * @param {JSON} res Response
 */

exports.create = (req, res) => {
 
    if (utils.isEmptyObject(req.body)) {  
        res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
        });
    }

    // Create a Aposta
    const new_aposta = new Aposta({
        idUsuario: req.body.idUsuario,
        idPartida: req.body.idPartida,
        valor: req.body.valor,
        dataHora: now,
        opcao: req.body.opcao,
        pontosTimeA: req.body.pontosTimeA,
        pontosTimeB: req.body.pontosTimeA
    }); 

    // Save the Aposta in the db
    Aposta.create(new_aposta, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu na criação da Aposta"
            })
        }
        else res.send(data);
    });  
};

exports.delete = (req, res) => {

    if (utils.isEmptyObject(req.body)) {   //Verifica se o body não é vazio
      res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
      });
    }

    Aposta.delete(req.body.idAposta, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu na exclusão"
            });
        } else res.send(data);
    });
};

exports.getAll = (req, res) => {
    Aposta.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu"
            });
        } else res.send(data);
    });
};

exports.getAllByApostador = (req, res) => {
    Aposta.getAllByApostador(req.params.id, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu"
            });
        } else res.send(data);
    });
};

exports.updateById = (req, res) => {

    if (utils.isEmptyObject(req.body)) {
        res.status(400).send({
          message: "O conteúdo não pode ser vazio!",
        });
    }

    const edited_aposta = new Aposta({
        valor: req.body.valor,
        dataHora: req.body.dataHora,
        opcao: req.body.opcao,
    }); 

    Aposta.updateById(req.body.idAposta, edited_aposta, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu na edição da Aposta"
            })
        } else res.send(data)
    });
};
