const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'travel_calculator'
});

const addClient =  function(client) {
  return pool.query(`
  INSERT INTO clients (name, address)
  VALUES ($1, $2) returning *;
  `, [client.name, client.address])
  .then(res => {
    return res;
  })
  .catch(err => {
    console.log("error message", err);
  });
}
exports.addClient = addClient;