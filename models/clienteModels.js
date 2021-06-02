var pool = require("./connection");

module.exports.select = async () => {
  try {
    let res = await pool.query("SELECT * FROM Cliente");
    return res;
  } catch (err) {
    console.log(
      "An errror has occured while trying to SELECT FROM Clientes.\n Dumping Stack.\n",
      err.stack
    );
    return err.message;
  }
};

module.exports.getByName = async function (username) {
  try {
      const cliente = await pool.query('SELECT * FROM Cliente WHERE C_username = ?', username);
      return cliente;
  }
  catch (err) {
      return err;
  }
}