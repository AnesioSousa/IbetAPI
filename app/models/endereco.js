const sql = require("./db.js");

/**
 * Construtor
 */
const Endereco = function(endereco) {
  this.idPessoa = endereco.idPessoa;
  this.codigoPostal = endereco.codigoPostal;
  this.logradouro = endereco.logradouro;
  this.numero = endereco.numero;
  this.complemento = endereco.complemento;
  this.bairro = endereco.bairro;
  this.cidade = endereco.cidade;
  this.estado = endereco.estado;
  this.pais = endereco.pais;
};

Endereco.create = (newEndereco, result) => {
  sql.query("INSERT INTO endereço SET ?", newEndereco, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("endereço criado: ", { id: res.insertId, ...newEndereco });
    result(null, { id: res.insertId, ...newEndereco });
  });
};

Endereco.delete = (idEndereco, result) => {
  sql.query("DELETE FROM endereço WHERE idEndereco=?", idEndereco, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result("Endereco excluido");
  });
};

Endereco.findById = (idEndereco, result) => {
  sql.query("SELECT * FROM pessoa INNER JOIN endereço ON (pessoa.idPessoa = endereco.idPessoa) WHERE idEndereco = ? ", idEndereco, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      
      if (res.length) {
          console.log("Endereco found", res[0]);
          result(null, res[0]);
          return;
      }

      // not found Endereco with the id
      result({ kind: "not_found" }, null);
  });
};

Endereco.getAll = (result) => {
  sql.query("SELECT * FROM pessoa INNER JOIN endereço ON (pessoa.idPessoa = endereco.idPessoa)", (err, res) =>{
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      console.log("Enderecoes: ", res);
      result(null, res);
  });
};


Endereco.updateById = (id, pessoa, result) => {
  sql.query("SET SQL_SAFE_UPDATES=0; UPDATE pessoa INNER JOIN endereço ON pessoa.idPessoa = endereco.idPessoa SET pessoa.nome = ?, SET pessoa.telefone = ?, SET pessoa.dataNascimento = ?, SET pessoa.cpf = ?, WHERE endereco.idEndereco = ?; SET SQL_SAFE_UPDATES=1;",
   [pessoa.nome, pessoa.telefone, pessoa.dataNascimento, pessoa.cpf, id], (err, res) => {
    if(err) {
      console.log("error:", err);
      result(null, err);
      return;
  }
  
  if(res.affectedRows == 0){
      // not found Team with the id
      result({ kind: "not_found" }, null);
      return;
  }

  console.log("update endereco: ", {id: id, ...endereco});
  result(null, { id: id, ...endereco })
  })
}

module.exports = Endereco;