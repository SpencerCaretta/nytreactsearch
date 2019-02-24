const axios = require("axios");
const router = require("express").Router();

router.get("/:query", (req,res) => {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + req.params.query)
      .then((results) => res.json(results.data))
      .catch(err => res.status(422).json(err));
  });
  
  module.exports = router;