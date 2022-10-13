module.exports = function(router, database) {

  router.post('/login', (req, res) => {

    const username = req.body["username"];
    const password = req.body["password"];
    database.validateLogin(username, password)
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });

  return router;
};