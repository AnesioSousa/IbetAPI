const sql = require("./db.js");

// Em construcao

const Saque = function(saque) {
    this.idApostador = saque.idApostador;
    this.idContaBancaria = saque.idContaBancaria;
    this.valor = saque.valor;
    this.dataHora = saque.dataHora
}

Saque.create = (newSaque, result) => {
    sql.query("SELECT saldo FROM apostador WHERE idApostador = ?", [newSaque.idApostador], (err, saldoApostador) => {
        if(saldoApostador[0]["saldo"] < newSaque.valor){
            result({msg: "Saldo insuficinete"});
            return;
        }
        else{
            sql.query("INSERT INTO saque SET ?", newSaque, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                sql.query("SELECT saldo FROM apostador WHERE idApostador = ?", [newSaque.idApostador], (err, saldoApostador) => {
                    let novoValor = saldoApostador[0]["saldo"] - newSaque.valor;
                    sql.query("UPDATE apostador SET saldo = ? WHERE idApostador = ?", [novoValor , newSaque.idApostador])
                })
                
                console.log("saque criado: ", { id: res.insertId, ...newSaque });
                result(null, { id: res.insertId, ...newSaque });
            });
        }
    })
};

Saque.getAllByApostador = (idApostador, result) => {
    sql.query("SELECT * FROM saque WHERE idApostador = ?", idApostador, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Saques: ", res);
        result(null, res);
    });
};

module.exports = Saque;
