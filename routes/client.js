module.exports = function(router, database) {

  router.post('/new', (req, res) => {
    const client = req.body;
    database.addClient(client)
      .then(() => {
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });

  return router;
}