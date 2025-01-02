const sql = require("./db.js");

/**
 * Construtor
 */
const Pessoa = function(pessoa) {
  this.nome = pessoa.nome;
  this.telefone = pessoa.telefone;
  this.email = pessoa.email;
  this.dataNascimento = pessoa.dataNascimento;
  this.username = pessoa.username;
  this.senha = pessoa.senha;
  this.cpf = pessoa.cpf;
};

Pessoa.create = (newPessoa, result) => {
    sql.query("INSERT INTO Pessoa SET ?", newPessoa, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;}
  
      console.log("pessoa criada: ", { id: res.insertId, ...newPessoa });
      result(null, { id: res.insertId, ...newPessoa });
    });
  };
  
  module.exports = Pessoa;