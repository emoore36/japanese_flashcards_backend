var express = require('express');
const DTO = require('../models/DTO');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    const dto = new DTO(200, 'Welcome to the Japanese Flashcards Backend server.');
    res.json(dto);
});

module.exports = router;
