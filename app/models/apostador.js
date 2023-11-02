const sql = require("./db.js");

/**
 * Construtor
 */
const Apostador = function (apostador) {
  this.idPessoa = apostador.idPessoa;
  this.saldo = apostador.saldo;
};

Apostador.create = (newApostador, result) => {
  sql.query("INSERT INTO apostador SET ?", newApostador, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("apostador criado: ", { id: res.insertId, ...newApostador });
    result(null, { id: res.insertId, ...newApostador });
  });
};

Apostador.delete = (idApostador, result) => {
  sql.query("DELETE FROM pessoa WHERE idPessoa=?", aux, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pessoa with id: ", aux);
    result(null, err);
  });
};

Apostador.findById = (idApostador, result) => {
  sql.query(
    "SELECT * FROM pessoa INNER JOIN apostador ON (pessoa.idPessoa = apostador.idPessoa) WHERE idApostador = ? ",
    idApostador,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("Apostador found", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Apostador with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Apostador.getAll = (result) => {
  sql.query(
    "SELECT * FROM pessoa INNER JOIN apostador ON (pessoa.idPessoa = apostador.idPessoa)",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Apostadores: ", res);
      result(null, res);
    }
  );
};

Apostador.updateById = (id, pessoa, result) => {
  sql.query(
    "SET SQL_SAFE_UPDATES=0; UPDATE pessoa INNER JOIN apostador ON pessoa.idPessoa = apostador.idPessoa SET pessoa.nome = ?, SET pessoa.telefone = ?, SET pessoa.dataNascimento = ?, SET pessoa.cpf = ?, WHERE apostador.idApostador = ?; SET SQL_SAFE_UPDATES=1;",
    [pessoa.nome, pessoa.telefone, pessoa.dataNascimento, pessoa.cpf, id],
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Team with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("update apostador: ", { id: id, ...apostador });
      result(null, { id: id, ...apostador });
    }
  );
};

module.exports = Apostador;
