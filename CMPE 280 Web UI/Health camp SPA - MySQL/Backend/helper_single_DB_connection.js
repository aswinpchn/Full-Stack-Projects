const mysql = require('mysql2/promise');

// https://github.com/sidorares/node-mysql2/blob/master/documentation/Promise-Wrapper.md
// create a single connection to database and execute one query.
// First, I tried to create connection here and send connection to another file and tried calling connection.query(), but for some reason connection kept failing.
// This shows that connection can be reused multiple time. Pool is the one for that.
let dbCall = async (query) => {
  const connection = await mysql.createConnection({
    host: 'database-1.***.us-west-1.rds.amazonaws.com',
    user: 'root',
    database: 'CMPE_280',
    password: '***'
  });
  
  const [rows] = await connection.query(query);
  // console.log(JSON.stringify(rows));
  await connection.end();
  return rows;
}

module.exports = dbCall;