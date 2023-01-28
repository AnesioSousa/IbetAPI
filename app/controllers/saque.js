const Saque = require("../models/saque.js");
const utils = require("../utils/utils.js");
now = new Date;

/**
 * Create and save a new saque
 * @param {*} req Request
 * @param {JSON} res Response
 */

exports.create = (req, res) => {
 
    if (utils.isEmptyObject(req.body)) {  
        res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
        });
    }

    // Create a Saque
    const new_saque = new Saque({
        idApostador: req.body.idApostador,
        idContaBancaria: req.body.idContaBancaria,
        valor: req.body.valor,
        dataHora: now,
    }); 

    // Save the Saque in the db
    Saque.create(new_saque, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu no Saque"
            })
        }
        else res.send(data);
    }); 
};

exports.getAllByApostador = (req, res) => {
    Saque.getAllByApostador(req.params.id, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu"
            });
        } else res.send(data);
    });
};
