const sql = require("./db.js");

// Constructor
const Time = function(time) {
    this.nome = time.nome;
    this.pais = time.pais;
};

// Create a new team
Time.create = (newTime, result) => {
    sql.query("INSERT INTO time SET ?", newTime, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

    console.log("Created team: ", { id: res.insertId, ...newTime });
    result(null, { id: res.insertId, ...newTime });
    })
};

// Searche a team by its ID
Time.findById = (id, result) => {
    sql.query(`SELECT * FROM time WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
        
        if (res.length) {
            console.log("Team found", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Team with the id
        result({ kind: "not_found" }, null);
    });
};

Time.getAll = (result) => {
    sql.query("SELECT * FROM time", (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Teams: ", res);
        result(null, res);
    });
};

Time.updateById = (id, time, result) => {
    sql.query("UPDATE time SET nome = ?, pais = ?, WHERE idTime = ?", [time.nome, time.pais, id], (err, res) => {
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

        console.log("update team: ", {id: id, ...time});
        result(null, { id: id, ...time })
    });
};

Time.delete = (id, result) => {
    sql.query("DELETE FROM time WHERE id = ?", id, (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Team with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted team with id: ", id);
        result(null, res);      
    });
};

Time.removeAll = result => {
    sql.query("DELETE FROM time", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} teams`);
        result(null, res);
    });
};

module.exports = Time;
