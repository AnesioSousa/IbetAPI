const sql = require("./db.js");

/**
 * Construtor
 */
const Administrador = function(administrador) {
  this.idPessoa = administrador.idPessoa;
};

Administrador.create = (newAdministrador, result) => {
  sql.query("INSERT INTO administrador SET ?", newAdministrador, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("administrador criado: ", { id: res.insertId, ...newAdministrador });
    result(null, { id: res.insertId, ...newAdministrador });
  });
};

Administrador.delete = (idAdministrador, result) => {
  sql.query("DELETE FROM administrador WHERE idAdministrador=?", idAdministrador, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result("Administrador excluido");
  });
};

Administrador.findById = (idAdministrador, result) => {
  sql.query("SELECT * FROM pessoa INNER JOIN administrador ON (pessoa.idPessoa = administrador.idPessoa) WHERE idAdministrador = ? ", idAdministrador, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      
      if (res.length) {
          console.log("Administrador found", res[0]);
          result(null, res[0]);
          return;
      }

      // not found Administrador with the id
      result({ kind: "not_found" }, null);
  });
};

Administrador.getAll = (result) => {
  sql.query("SELECT * FROM pessoa INNER JOIN administrador ON (pessoa.idPessoa = administrador.idPessoa)", (err, res) =>{
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      console.log("Administradores: ", res);
      result(null, res);
  });
};


Administrador.updateById = (id, pessoa, result) => {
  sql.query("SET SQL_SAFE_UPDATES=0; UPDATE pessoa INNER JOIN administrador ON pessoa.idPessoa = administrador.idPessoa SET pessoa.nome = ?, SET pessoa.telefone = ?, SET pessoa.dataNascimento = ?, SET pessoa.cpf = ?, WHERE administrador.idAdministrador = ?; SET SQL_SAFE_UPDATES=1;",
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

  console.log("update administrador: ", {id: id, ...administrador});
  result(null, { id: id, ...administrador })
  })
}

module.exports = Administrador;