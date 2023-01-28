const sql = require("./db.js");

const ContaBancaria = function(contaBancaria) {
	this.idApostador = contaBancaria.idApostador; 
	this.banco = contaBancaria.banco;
	this.agencia = contaBancaria.agencia;
	this.tipo = contaBancaria.tipo;
	this.conta = contaBancaria.conta; 
	this.digito = contaBancaria.digito; 
	this.variacao = contaBancaria.variacao;
	this.titular = contaBancaria.titular; 
}

ContaBancaria.create = (newContaBancaria, result) => {
    sql.query("INSERT INTO contabancaria SET ?", newContaBancaria, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.loge("conta bancaria criada: ", {id: res.insertId, ...newContaBancaria});
        result(null, { id: res.insertId, ...newContaBancaria });
    });
};

ContaBancaria.delete = (idContaBancaria, result) => {
    sql.query("DELETE FROM contabancaria WHERE idContaBancaria=?", idContaBancaria, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result("Conta Bancaria excluida");
    });
  };

ContaBancaria.findById = (idContaBancaria, result) => {
    sql.query("SELECT * FROM contabancaria WHERE idContaBancaria = ? ", idContaBancaria, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("Conta Bancaria found", res[0]);
            result(null, res[0]);
            return;
        }
  
        // not found Conta Bancaria with the id
        result({ kind: "not_found" }, null);
    });
  };

ContaBancaria.getAll = (result) => {
    sql.query("SELECT * FROM contabancaria", (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
  
        console.log("Contas Bancarias: ", res);
        result(null, res);
    });
};

ContaBancaria.updateById = (id, contaBancaria, result) => {
    sql.query("SET SQL_SAFE_UPDATES=0; UPDATE contabancaria SET banco = ?, SET agencia = ?, SET tipo = ?, SET conta = ?, SET digito = ?, SET variacao = ?, SET titular = ?, WHERE idContaBancaria = ?; SET SQL_SAFE_UPDATES=1;",
     [contaBancaria.banco, contaBancaria.agencia, contaBancaria.tipo, contaBancaria.conta, contaBancaria.digito, contaBancaria.variacao, contaBancaria.titular, id], (err, res) => {
      if(err) {
        console.log("error:", err);
        result(null, err);
        return;
    }
    
    if(res.affectedRows == 0){
        // not found Conta Bancaria with the id
        result({ kind: "not_found" }, null);
        return;
    }
  
    console.log("update conta bancaria: ", {id: id, ...contaBancaria});
    result(null, { id: id, ...contaBancaria })
    })
}
  
module.exports = ContaBancaria;
