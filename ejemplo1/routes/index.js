const express = require("express");
const router = express.Router();
const mu = require("../modules/MogoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.getAllDatabases().then(dbs => {
    res.render("index.ejs", { databases: dbs.databases });
  });
});

router.get("/collections/:query", (req, res) => {
  const query = req.params.query;
  mu.getAllCollections(query).then(collections => res.json(collections));
});

router.get("/data/:query", (req, res) => {
  const query = req.params.query;
  mu.getAllCollections(query).then(collections => res.json(collections));
});

router.get("/data/:dbName/:dbCollection", (req, res) => {
  const dbName = req.params.dbName;
  const dbCollection = req.params.dbCollection;
  mu.getAllData(dbName, dbCollection).then(data => res.json(data));
});

router.post("/post/:dbCollection/:dbName", (req, res) => {

  //console.log(req.body);
  const dbName = req.params.dbName;
  const dbCollection = req.params.dbCollection;
  
  mu.insertOneDoc(req.body,dbCollection,dbName).then(data => res.json(data));
});



router.post("/data/:query", (req, res) => {
  const query = req.params.query;
  mu.getAllCollections(query).then(collections => res.json(collections));
});
module.exports = router;
