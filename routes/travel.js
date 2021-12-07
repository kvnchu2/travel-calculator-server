const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET travel time and mileage for route */
router.get('/calculateRoute/:fromLat/:fromLon/:toLat/:toLon', function(req, response, next) {
  const fromLat = req.params['fromLat'];
  const fromLon = req.params['fromLon'];
  const toLat = req.params['toLat'];
  const toLon = req.params['toLon'];

  axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${fromLat},${fromLon}:${toLat},${toLon}/json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&departAt=2021-11-05T15:30:00.000Z&traffic=true`)
    .then((res) => {
      console.log(res.data.routes[0].summary);
    });
});

module.exports = router;

