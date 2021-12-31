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
    const id = req.body["id"];
    console.log(id);
    database.deleteClient(id)
      .then(() => {
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });

  router.get('/find/icbc/:name', (req, res) => {
    const name = req.params["name"];
    console.log(name);
    database.findIcbcClient(name)
      .then((results) => {
        res.send(results);
        console.log(results);
      })
      .catch(e => res.send(e));
  });

  router.get('/find/wsbc/:name', (req, res) => {
    const name = req.params["name"];
    console.log(name);
    database.findWsbcClient(name)
      .then((results) => {
        res.send(results);
        console.log(results);
      })
      .catch(e => res.send(e));
  });

  

  return router;
};