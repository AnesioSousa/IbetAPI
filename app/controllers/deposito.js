const Deposito = require("../models/deposito.js");
const utils = require("../utils/utils.js");
now = new Date;

/**
 * Create and save a new Deposito
 * @param {*} req Request
 * @param {JSON} res Response
 */

exports.create = (req, res) => {
 
    if (utils.isEmptyObject(req.body)) {  
        res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
        });
    }

    // Create a Deposito
    const new_deposito = new Deposito({
        idApostador: req.body.idApostador,
        valor: req.body.valor,
        dataHora: now,
    }); 

    // Save the Deposito in the db
    Deposito.create(new_deposito, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu no Deposito"
            })
        }
        else res.send(data);
    });  
};

exports.getAllByApostador = (req, res) => {
    Deposito.getAllByApostador(req.params.id, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu"
            });
        } else res.send(data);
    });
};