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

module.exports.getById = async function (id) {
  try {
      let alerta = await pool.query('SELECT * FROM Alerta where C_id = ? order by A_date', id);
      return alerta;
  }
  catch (err) {
      return err;
  }
}

module.exports.getByIdMenu = async function (id) { 

  try {
      let alerta = await pool.query('select * from Alerta WHERE (A_date BETWEEN now() AND adddate(now(),+7)) and C_id = ? order by A_date', id);
      return alerta;
  }
  catch (err) {
      return err;
  }
}

module.exports.create = async (alerta) => {
    try {
        let res = await pool.query('INSERT INTO Alerta (A_nomeMedicamento, A_estado, A_hour, A_date, C_id) values(?,?,?,?,?) ', [alerta.medicamento, alerta.estado, alerta.hora, alerta.dataA, alerta.C_id]);
        return res;
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into Alertas.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
  };

module.exports.alterarEstado = async (id) => {
  try {
    
    let res = await pool.query(
      `UPDATE Alerta SET A_estado =  CASE  
                        WHEN A_estado = "não concluido" THEN "concluido" 
                        WHEN A_estado = "concluido" THEN "não concluido" 
                        ELSE A_estado
                    END WHERE A_id = ?`, id
    );
    if (res.affectedRows == 0) return false;
    else return true;
  } catch (err) {
    console.log(
      "An errror has occured while trying to UPDATE Alertas.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};