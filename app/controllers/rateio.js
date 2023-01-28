const sql = require("../models/db.js");

exports.create = (req, res) => {
    var resposta;
    sql.query("SELECT * FROM resultado WHERE idResultado =?",[req.body.idResultado], (err, result) =>{
        if (err) {
            console.log("error: ", err);
            res(null, err);
            return;
        }
        var valorTotalApostas;
        if(result[0]["pontosTimeA"] > result[0]["pontosTimeB"]){
            sql.query("SELECT idUsuario FROM aposta WHERE pontosTimeA > pontosTimeB and idPartida =?",[result[0]["idPartida"]], (err, apostadoresTimeA) =>{
                let apostadoresAMap = [];
                resposta = apostadoresTimeA;
                apostadoresTimeA.map((x) => apostadoresAMap.push(x["idUsuario"]));
                sql.query("SELECT sum(valor) FROM aposta WHERE idPartida =?",[result[0]["idPartida"]], (err, valorTotal) =>{
                    var valorUnitario = valorTotal[0]["sum(valor)"]/apostadoresAMap.length;
                    sql.query("UPDATE apostador SET saldo = (saldo + ?) WHERE idApostador IN (SELECT idUsuario FROM aposta WHERE pontosTimeB < pontosTimeA and idPartida =?)", [valorUnitario , result[0]["idPartida"]]);
                    console.log(apostadoresAMap.toString());
                });
                //Em contrucao
                console.log("Resposta: ", resposta);
                res.send(resposta);
            });
        }
        else if(result[0]["pontosTimeB"] > result[0]["pontosTimeA"]){
            sql.query("SELECT idUsuario FROM aposta WHERE pontosTimeB > pontosTimeA and idPartida =?",[result[0]["idPartida"]], (err, apostadoresTimeB) =>{
                let apostadoresBMap = [];
                resposta = apostadoresTimeB;
                apostadoresTimeB.map((x) => apostadoresBMap.push(x["idUsuario"]));
                sql.query("SELECT sum(valor) FROM aposta WHERE idPartida =?",[result[0]["idPartida"]], (err, valorTotal) =>{
                    var valorUnitario = valorTotal[0]["sum(valor)"]/apostadoresBMap.length;
                    sql.query("UPDATE apostador SET saldo = (saldo + ?) WHERE idApostador IN (SELECT idUsuario FROM aposta WHERE pontosTimeB > pontosTimeA and idPartida =?)", [valorUnitario , result[0]["idPartida"]]);
                    console.log(apostadoresBMap.toString());
                });
                //Em contrucao
                console.log("Resposta: ", resposta);
                res.send(resposta);
            });
        }
        else if(result[0]["pontosTimeB"] = result[0]["pontosTimeA"]){
            sql.query("SELECT idUsuario FROM aposta WHERE pontosTimeB = pontosTimeA and idPartida =?",[result[0]["idPartida"]], (err, apostadoresEmpate) =>{
                resposta = apostadoresEmpate;
                //Em contrucao
                console.log("Resposta: ", resposta);
                res.send(resposta);
            });
        }
    });
}