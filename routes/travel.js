const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/travel', function(req, response, next) {
  axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${coordinates[y].results[0].position.lat},${coordinates[y].results[0].position.lon}:${coordinates[y+1].results[0].position.lat},${coordinates[y+1].results[0].position.lon}/json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&departAt=${icbcArr[y].startTime}&traffic=true`)
    .then((res) => {
      response.json(res);
    });
});

module.exports = router;



