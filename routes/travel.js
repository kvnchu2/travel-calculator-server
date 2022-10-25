const express = require('express');
const router = express.Router();
const axios = require('axios');


const dotenv = require('dotenv');
dotenv.config();

/* GET travel time and mileage for route */
router.get('/calculateRoute/:fromLat/:fromLon/:toLat/:toLon/:departTime', function(req, response, next) {
  const fromLat = req.params['fromLat'];
  const fromLon = req.params['fromLon'];
  const toLat = req.params['toLat'];
  const toLon = req.params['toLon'];
  const departTime = req.params['departTime'];

  // return axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${fromLat},${fromLon}:${toLat},${toLon}/json?key=${process.env.TOMTOM_KEY}&departAt=${departTime}&traffic=true`);
    // .then((res) => {
    //   console.log(res.data.routes[0].summary);
    // });

  // return axios.get('https://jsonplaceholder.typicode.com/todos/1')
  //   .then((result) => {
  //     console.log(typeof result);
  //   });

  return response.send("hello");

});

module.exports = router;


