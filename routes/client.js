module.exports = function(router, database) {

  router.post('/new', (req, res) => {
    const client = req.body;
    database.addClient(client)
      .then(() => {
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });

  router.get('/all', (req, res) => {
    database.getAllClients()
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });

  router.post('/delete', (req, res) => {
    const id = req.body.id;
    database.addClient(id)
      .then(() => {
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });

  return router;
};