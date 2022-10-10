module.exports = function(router, database) {

  router.post('/add/:company/:link', (req, res) => {

    const company = req.params["company"];
    const link = req.params["link"];
    database.addBillingLink(company, link)
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });

  router.get('/all', (req, res) => {

    database.getBillingLink()
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });

  return router;
};