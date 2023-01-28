const sql = require("./db.js");

// Lembrete pra fazer verificação de saldo do apostador

/**
 * Construtor
 */
const Aposta = function(aposta) {
    this.idUsuario = aposta.idUsuario;
    this.idPartida = aposta.idPartida;
    this.valor = aposta.valor;
    this.dataHora = aposta.dataHora;
    this.opcao = aposta.opcao
};

Aposta.create = (newAposta, result) => {
    sql.query("SELECT saldo FROM apostador WHERE idApostador = ?", [newAposta.idUsuario], (err, saldoApostador) => {
        if(saldoApostador[0]["saldo"] < newAposta.valor){
            result({msg: "Saldo insuficinete"});
            return;
        }
        else{
            sql.query("INSERT INTO aposta SET ?", newAposta, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                sql.query("SELECT saldo FROM apostador WHERE idApostador = ?", [newAposta.idUsuario], (err, saldoApostador) => {
                    let novoValor = saldoApostador[0]["saldo"] - newAposta.valor;
                    sql.query("UPDATE apostador SET saldo = ? WHERE idApostador = ?", [novoValor , newAposta.idUsuario])
                })

                console.log("aposta criada: ", { id: res.insertId, ...newAposta });
                result(null, { id: res.insertId, ...newAposta });
            });
}})
};

Aposta.delete = (id, result) => {
    sql.query("DELETE FROM aposta WHERE id = ?", id, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Aposta with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted aposta with id: ", id);
        result(null, res);      
    });
};

Aposta.findById = (id, result) => {
    sql.query(`SELECT * FROM aposta WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
        
        if (res.length) {
            console.log("Aposta found", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Aposta with the id
        result({ kind: "not_found" }, null);
    });
};

Aposta.getAllByApostador = (idUsuario, result) => {
    sql.query("SELECT * FROM aposta WHERE idUsuario = ?", idUsuario, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Apostas: ", res);
        result(null, res);
    });
};

Aposta.getAll = (result) => {
    sql.query("SELECT * FROM aposta", (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Apostas: ", res);
        result(null, res);
    });
};

Aposta.updateById = (id, aposta, result) => {
    sql.query("UPDATE aposta SET valor = ?, dataHora = ?, opcao = ?, WHERE idAposta = ?", [aposta.valor, aposta.dataHora, aposta.opcao, id], (err, res) => {
        if(err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        
        if(res.affectedRows == 0){
            // not found Aposta with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("update aposta: ", {id: id, ...aposta});
        result(null, { id: id, ...aposta })
    });
};

Aposta.removeAll = result => {
    sql.query("DELETE FROM aposta", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} apostas`);
        result(null, res);
    });
};

module.exports = Aposta;