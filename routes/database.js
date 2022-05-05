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
  connectionString: process.env.PROD_URI,
  ssl: {
    rejectUnauthorized: false
  }
});

const addClient =  function(client) {
  return pool.query(`
  INSERT INTO clients (name, address, provider, end_date)
  VALUES ($1, $2, $3, $4) returning *;
  `, [client.name, client.address, client.provider, client.end_date])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("error message", err);
    });
};

exports.addClient = addClient;

const getAllClients = function() {
  return pool.query(`
    SELECT * from CLIENTS;
    `)
    .then(res => res.rows);
};

exports.getAllClients = getAllClients;

const deleteClient = function(id) {
  return pool.query(`
    DELETE FROM CLIENTS
    WHERE id = $1;
    `, [id])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("error message", err);
    });
};

exports.deleteClient = deleteClient;

const editClient = function(id,address, endDate) {
  return pool.query(`
    UPDATE CLIENTS
    SET ADDRESS = $2,
    end_date = $3
    WHERE id = $1;
    `, [id, address, endDate])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("error message", err);
    });
};

exports.editClient = editClient;

const findIcbcClient = function(name) {
  return pool.query(`
    SELECT * from CLIENTS
    WHERE name = $1 
    AND (provider = 'ICBC' OR provider = '');
    `, [name])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("error message", err);
    });
};

exports.findIcbcClient = findIcbcClient;

const findWsbcClient = function(name) {
  return pool.query(`
    SELECT * from CLIENTS
    WHERE name = $1 
    AND (provider = 'WSBC' OR provider = '');
    `, [name])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("error message", err);
    });
};

exports.findWsbcClient = findWsbcClient;

const filterEndDateClient = function() {

  //accepts a date and converts it to a string ex. 2022-05-05
  // const formatDate = (date) => {
  //   let d = new Date(date),
  //     month = '' + (d.getMonth() + 1),
  //     day = '' + d.getDate(),
  //     year = d.getFullYear();

  //   if (month.length < 2) {
  //     month = '0' + month;
  //   }
  //   if (day.length < 2) {
  //     day = '0' + day;
  //   }
  //   return [year, month, day].join('-');
  // };


  // const currentDate = new Date();
  // const notificationDate = currentDate.getDate() + 14;

  // return pool.query(`
  //   SELECT * from CLIENTS
  //   WHERE end_date BETWEEN $1 AND $2;
  //   `, [formatDate(currentDate), formatDate(notificationDate)])
  //   .then(res => {
  //     return res;
  //   })
  //   .catch(err => {
  //     console.log("error message", err);
  //   });

  return pool.query(`
    SELECT * from CLIENTS;
    `)
    .then(res => res.rows);
};

exports.filterEndDateClient = filterEndDateClient;