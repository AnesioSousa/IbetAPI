const sql = require("./db.js");

/**
 * Construtor
 */
 const Partida = function(partida) {
    this.idPartida = partida.idPartida;
    this.idTimeA = partida.idTimeA;
    this.idTimeB = partida.idTimeB;
    this.estadio = partida.estadio;
    this.dataHoraInicio = partida.dataHoraInicio;
    this.campeonato = partida.campeonato;
    this.status = partida.status;
    this.descricao = partida.descricao;
  };

  // Esse método cria uma nova partida 
  Partida.criar = (newPartida, result) => {
    sql.query("INSERT INTO partida SET ?", newPartida, (err, res) => {
        if (err) {
          console.log("erro: ", err);
          result(err, null);
          
          return;
        }
    
        console.log("Partida criada: ", { id: res.insertId, ...newPartida });
        result(null, { id: res.insertId, ...newPartida });
      });
  };

  // Esse método que faz a procura de uma partida usando um id
  Partida.encontrarPorId = (id, result) => {
    sql.query(`SELECT * FROM partida WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(err, null);

        return;
      }
  
      if (res.length) {
        console.log("partida encontrada: ", res[0]);
        result(null, res[0]);

        return;
      }
  
      // Caso não seja encontrada uma partida com o id fornecido
      result({ kind: "not_found" }, null);
    });
  };

  Partida.retorneTodas = (result) => {
    let query = "SELECT * FROM partida";

    sql.query(query, (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);

        return;
      }
  
      console.log("partidas: ", res);
      result(null, res);
    });
  };

  Partida.atualizarPorId = (id, partida, result) => {
    sql.query(
      "UPDATE partida SET idTimeA = ?, idTimeB = ?, estadio = ?, datahorainicio = ?, campeonato = ?, status = ?, descricao = ?, WHERE id = ?",
      [partida.idTimeA, partida.idTimeB, partida.estadio, partida.dataHoraInicio, partida.campeonato, partida.status, partida.descricao, id],
      (err, res) => {
        if (err) {
          console.log("erro: ", err);
          result(null, err);

          return;
        }
        // Se não houveram linhas afetadas
        if (res.affectedRows == 0) {
          // não foi encontrada uma partida com o id
          result({ kind: "not_found" }, null);

          return;
        }
  
        console.log("partida atualizada ", { id: id, ...partida });
        result(null, { id: id, ...partida });
      }
    );
  };

  Partida.remover = (id, result) => {
    sql.query("DELETE FROM partida WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);

        return;
      }
      // Se não houveram linhas afetadas
      if (res.affectedRows == 0) {
        // não foi encontrada uma partida com o id
        result({ kind: "not_found" }, null);

        return;
      }
  
      console.log("foi removida a partida de id: ", id);
      result(null, res);
    });
  };

  Partida.removerTodas = result => {
    sql.query("DELETE FROM partida", (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
        
        return;
      }
  
      console.log(`deletadas ${res.affectedRows} partidas`);
      result(null, res);
    });
  };
  

  module.exports = Partida;