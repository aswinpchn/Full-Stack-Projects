const mysql = require('mysql2/promise');  // This will returns promise for all the mysql2 actions.

// https://github.com/sidorares/node-mysql2/blob/master/documentation/Promise-Wrapper.md
// If you see the difference between pool creation here and the connection creation in the other helper is that. Connection is created inside the dbcall function. Pool is created outside itself.
// First I tried to create connection also outside like pool. But connection was inaccessible if I created it outside. so I had to put the connection inside the dBcall function itself in the other helper.
const pool = mysql.createPool({
  host: 'database-1.***.us-west-1.rds.amazonaws.com',
  user: 'root',
  database: 'CMPE_280',
  password: '***'
});

// The pool will emit a connection event when a new connection is made within the pool.
pool.on('connection', () => {
  console.log('New connection is made with the pool');
});

// The pool will emit an acquire event when a connection is acquired from the pool
pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

// The pool will emit a release event when a connection is released back to the pool.
pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

let dbCall = async (query) => {
  try {
    const [rows] = await pool.query(query);
    // console.log(JSON.stringify(rows));
    return rows;
  }catch(e) {
    console.log(e);
    return []
  }
}

module.exports = dbCall;