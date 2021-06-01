const mysql = require("mysql");
const util = require("util");

 var pool = mysql.createPool({
   connectionLimit: 30,
   host: 'remotemysql.com',
   user: 'iW2uKMrb2H',
   password: 'K2dh4sHbiy',
   database: 'iW2uKMrb2H',
   port: '3306',
   timezone: 'utc'
})

// error in connection is detected when the server starts
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
    console.error(err.message)
  }
  if (connection) connection.release()
  return
})

pool.query = util.promisify(pool.query);

module.exports = pool