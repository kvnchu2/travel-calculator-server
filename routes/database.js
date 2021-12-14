const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const addClient =  function(client) {
  return pool.query(`
  INSERT INTO clients (name, address)
  VALUES ($1, $2, $3) returning *;
  `, [client.name, client.address])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => {
    console.log(err);
  });
}
exports.addClient = addClient;