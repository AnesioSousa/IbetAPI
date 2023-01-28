const Time = require("../models/time.js");
const utils = require("../utils/utils.js");

/**
 * Cria e salva um novo Time
 * @param {*} req Request
 * @param {JSON} res Response
 */

exports.create = (req, res) => {
 
    if (utils.isEmptyObject(req.body)) {  
        res.status(400).send({
        message: "O conteúdo não pode ser vazio!",
        });
    }

    // Create a team
    const new_time = new Time({
        nome: req.body.nome,
        pais: req.body.pais,
    }); 

    // Save the team in the db
    Time.create(new_time, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu na criação do Time"
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

    Time.delete(req.params.idTime, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu na exclusão"
            });
        } else res.send(data);
    });
};

exports.getAll = (req, res) => {
    Time.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu"
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

    const edited_time = new Time({
        nome: req.body.nome,
        pais: req.body.pais,
    }); 

    Time.updateById(req.params.idTime, edited_time, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu na edição do Time"
            })
        } else res.send(data)
    });
};