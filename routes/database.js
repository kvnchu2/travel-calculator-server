const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// const pool = new Pool({
//   user: 'postgres',
//   password: '123',
//   host: 'localhost',
//   database: 'travel_calculator'
// });

const pool = new Pool({
  user: process.env['PROD_USER'],
  password: process.env['PROD_PASS'],
  host: process.env['PROD_HOST'],
  database: process.env['PROD_DATABASE'],
  port: process.env['PROD_PORT'],
  ssl: true
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