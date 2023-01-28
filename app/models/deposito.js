const sql = require("./db.js");

const Deposito = function(deposito) {
    this.idApostador = deposito.idApostador;
    this.valor = deposito.valor;
    this.dataHora = deposito.dataHora
}

Deposito.create = (newDeposito, result) => {
    sql.query("INSERT INTO deposito SET ?", newDeposito, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        
        sql.query("SELECT saldo FROM apostador WHERE idApostador = ?", [newDeposito.idApostador], (err, saldoApostador) => {
            let novoValor = saldoApostador[0]["saldo"] + newDeposito.valor;
            sql.query("UPDATE apostador SET saldo = ? WHERE idApostador = ?", [novoValor , newDeposito.idApostador])
        });

        console.log("Deposito concluido: ", { id: res.insertId, ...newDeposito });
        result(null, { id: res.insertId, ...newDeposito });
    });
}

Deposito.getAllByApostador = (idApostador, result) => {
    sql.query("SELECT * FROM deposito WHERE idApostador = ?", idApostador, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Depositos: ", res);
        result(null, res);
    });
};

module.exports = Deposito;
