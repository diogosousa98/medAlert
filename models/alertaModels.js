var pool = require("./connection");

module.exports.select = async () => {
  try {
    let res = await pool.query("SELECT * FROM Alerta");
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Alertas.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.create = async (alerta) => {
    try {
        let res = await pool.query('INSERT INTO Alerta (A_nomeMedicamento, A_estado, A_hour, A_date) values(?,?,?,?) ', [alerta.nomeMedicamento, alerta.estado, alerta.hora, alerta.date]);
        return res;
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into Reservas.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
  };

module.exports.update = async (id, alerta) => {
  try {
    let keys = Object.keys(alerta);
    let vals = Object.values(alerta);
    let indexId = keys.indexOf("M_id");
    if (indexId != -1) {
      keys.splice(indexId, 1);
      vals.splice(indexId, 1);
    }
    let res = await pool.query(
      "UPDATE Alerta SET " + keys.join(" = ? ,") + " = ? WHERE M_id = ?",
      [...vals, id]
    );
    if (res.affectedRows == 0) return "No Alertas updated";
    else return "Alertas updated.";
  } catch (err) {
    console.log(
      "An errror has occured while trying to UPDATE Alertas.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.delete = async (id) => {
  try {
    let res = await pool.query("DELETE FROM Alerta WHERE C_id = ?", id);
    return res.affectedRows;
  } catch (err) {
    console.log(
      "An errror has occured while trying to DELETE FROM Alertas.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};
