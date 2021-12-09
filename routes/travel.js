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

  axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${fromLat},${fromLon}:${toLat},${toLon}/json?key=${process.env.TOMTOM_KEY}&departAt=${departTime}&traffic=true`)
    .then((res) => {
      console.log(res.data.routes[0].summary);
    });
});

module.exports = router;

//http://localhost:8080/travel/calculateRoute/49.22469/-123.03518/49.23566/-123.12379/2021-11-05T15:30:00.000Z
