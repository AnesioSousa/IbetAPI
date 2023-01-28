const sql = require("./db.js");

/**
 * Construtor
 */
const Funcionario = function(funcionario) {
  this.idPessoa = funcionario.idPessoa;
};

Funcionario.create = (newFuncionario, result) => {
  sql.query("INSERT INTO funcionario SET ?", newFuncionario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("funcionario criado: ", { id: res.insertId, ...newFuncionario });
    result(null, { id: res.insertId, ...newFuncionario });
  });
};

Funcionario.delete = (idFuncionario, result) => {
  sql.query("DELETE FROM funcionario WHERE idFuncionario=?", idFuncionario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result("Funcionario excluido");
  });
};

Funcionario.findById = (idFuncionario, result) => {
  sql.query("SELECT * FROM pessoa INNER JOIN funcionario ON (pessoa.idPessoa = funcionario.idPessoa) WHERE idFuncionario = ? ", idFuncionario, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      
      if (res.length) {
          console.log("Funcionario found", res[0]);
          result(null, res[0]);
          return;
      }

      // not found Funcionario with the id
      result({ kind: "not_found" }, null);
  });
};

Funcionario.getAll = (result) => {
  sql.query("SELECT * FROM pessoa INNER JOIN funcionario ON (pessoa.idPessoa = funcionario.idPessoa)", (err, res) =>{
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      console.log("Funcionarios: ", res);
      result(null, res);
  });
};


Funcionario.updateById = (id, pessoa, result) => {
  sql.query("SET SQL_SAFE_UPDATES=0; UPDATE pessoa INNER JOIN funcionario ON pessoa.idPessoa = funcionario.idPessoa SET pessoa.nome = ?, SET pessoa.telefone = ?, SET pessoa.dataNascimento = ?, SET pessoa.cpf = ?, WHERE funcionario.idFuncionario = ?; SET SQL_SAFE_UPDATES=1;",
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

  console.log("update funcionario: ", {id: id, ...funcionario});
  result(null, { id: id, ...funcionario })
  })
}

module.exports = Funcionario;