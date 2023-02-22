var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  const dto = {
    status: 200,
    message: 'Welcome to the Japanese Flashcards Backend server.',
    data: {}
  };

  res.json(dto);
});

module.exports = router;
