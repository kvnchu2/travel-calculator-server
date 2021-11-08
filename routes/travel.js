const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/travel', function(req, response, next) {
  
  axios.get(`https://api.tomtom.com/routing/1/calculateRoute/49.22469,-123.03518:49.23566,-123.12379/json?key=atFqCv6vs5HzL0u9qS9G5HXnhdYAA6kv&departAt=2021-11-05T15:30:00.000Z&traffic=true`)
    .then((res) => {
      console.log(res.data);
    });
});

module.exports = router;



