module.exports = function(router, database) {

  router.get('/clients', (req, res) => {
    database.getClientInitials()
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });

  return router;
};