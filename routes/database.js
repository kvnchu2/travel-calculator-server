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

const findEndDateClient = function() {

  //accepts a date and converts it to a string ex. 2022-05-05
  const formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  };


  const currentDate = new Date();
  const notificationDate = new Date();

  notificationDate.setDate(currentDate.getDate() + 14);

  return pool.query(`
    SELECT * from CLIENTS
    WHERE end_date BETWEEN $1 AND $2;
    `, [formatDate(currentDate), formatDate(notificationDate)])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("error message", err);
    });

};

exports.findEndDateClient = findEndDateClient;


//function to get all initials of clients, send to the front end and store in array


const getClientInitials = function() {
  return pool.query(`
    SELECT clients_id, start_date, end_date from SESSIONS
    `)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("error message", err);
    });

};

exports.getClientInitials = getClientInitials;

//function to loop through array of client initials, and query treatment start and end date


//function that accepts treatment start and end date as parameters, then pulls all events in the date range, counts number of client initials events and use sql query to update sessions completed column