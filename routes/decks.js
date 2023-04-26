var express = require('express');
const DeckBusinessService = require('../business/DeckBusinessService');
var router = express.Router();
var Deck = require('../models/Deck');
var DTO = require('../models/DTO');
var DeckValidator = require('../models/validators/DeckValidator');

const service = new DeckBusinessService();

router.get('/', async (req, res) => {

    console.log('Entering Deck router get().');

    let dto = DTO.default(405);

    try {

        // attempt to get
        const result = await service.readAll();

        // set DTO
        dto = result ? DTO.default(200, result) : DTO.default(404);

    } catch (err) {

        // print error
        console.error(err);

        // set DTO
        dto = DTO.default(500);
    }

    console.log('Leaving Deck router get().');

    // set response
    res.status(dto.code).json(dto);

});

router.post('/', async (req, res) => {

    console.log('Entering Deck router post().');

    let dto;

    // data validation
    const validationResult = DeckValidator.validate(req.body);

    if (validationResult.hasErrors) {
        console.log('Data validation errors exist. Returning 400 response.');
        dto = DTO.default(400, validationResult.errorsList);
    } else {

        try {
            // attempt to persist
            const result = await service.create(req.body);

            // set DTO
            dto = result ? DTO.default(201, result) : DTO.default(400);

        } catch (err) {

            // print error
            console.error(err);

            // set DTO
            dto = DTO.default(500);
        }
    }

    console.log('Leaving Deck router post().');

    // set response
    res.status(dto.code).json(dto);

});

router.get('/:id', async (req, res) => {

    let dto;

    const id = Number(req.params.id);

    if (!id || id <= 0 || !Number.isInteger(id)) {
        dto = new DTO(400, "Please include a valid id.");
    } else {

        try {

            // attempt to get
            const result = await service.readOne(id);

            // set DTO
            dto = result ? DTO.default(200, result) : DTO.default(404);

        } catch (err) {

            // print error
            console.error(err);

            // set DTO
            dto = DTO.default(500);
        }
    }

    res.status(dto.code).json(dto);

});

router.put('/:id', async (req, res) => {

    console.log('Entering Deck router put().');

    let dto;

    // data validation
    const validationResult = DeckValidator.validate(req.body).includeId(req.params.id);

    if (validationResult.hasErrors) {
        dto = DTO.default(400, validationResult.errorsList);
    } else {

        try {

            // attempt to put
            const result = await service.update({ id: Number(req.params.id), name: req.body.name });

            // set DTO
            dto = result ? DTO.default(201, result) : DTO.default(400);

        } catch (err) {

            // print error
            console.error(err);

            // set DTO
            dto = DTO.default(500);
        }

    }

    // set response status & json
    console.log('Leaving Deck router put() with response code', dto.code);

    // set response
    res.status(dto.code).json(dto);

});

router.delete('/:id', async (req, res) => {

    console.log('Entering Deck router delete().');

    let dto = DTO.default(405);

    const id = Number(req.params.id);

    // data validation
    if (!id || id <= 0 || !Number.isInteger(id)) {
        dto = new DTO(400, "'id' must be a valid, positive number");
    } else {

        try {

            // attempt delete
            const result = await service.delete(Number(req.params.id));

            // set DTO
            dto = result ? DTO.default(200) : DTO.default(400);

        } catch (err) {
            console.error(err);
            dto = DTO.default(500);
        }

    }

    console.log('Leaving Deck router delete() with response code', dto.code);

    // set response
    res.status(dto.code).json(dto);

});

module.exports = router;