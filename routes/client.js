module.exports = function(router, database) {

  router.get('/new', (req, res) => {
    res.send("hello this is new");
  });

  return router;
}