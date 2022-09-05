module.exports = function(router, database) {

  router.get('/clients', (req, res) => {
    database.getClientDates()
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });

  router.get('/find/all/:name/:startDate/:endDate', (req, res) => {
    const name = req.params["name"];
    const startDate = req.params["startDate"];
    const endDate = req.params["endDate"];
    database.sessionsCompleted(name, startDate, endDate)
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });
  return router;
};