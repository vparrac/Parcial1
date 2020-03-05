const express = require("express");
const router = express.Router();
const mu = require("../modules/MogoUtils");

/* GET home page. */
router.get("/", function(req, res) {
  const db = mu;
  db.getAllDatabases().then(dbs => {
    console.log("bu", dbs);
    res.render("index.ejs", { databases: dbs.databases });
  });
});

router.get("/collections/:query", (req, res) => {
  const query = req.params.query;
  mu.getAllCollections(query).then(collections => res.json(collections));
});

module.exports = router;
