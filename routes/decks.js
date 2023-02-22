var express = require('express');
const DeckDataService = require('../data/DeckDataService');
var router = express.Router();
var Deck = require('../models/Deck');
var DTO = require('../models/DTO');

const service = new DeckDataService();

router.get('/', async (req, res) => {

    console.log('Entering Deck router get().');

    let dto;

    try {

        const result = await service.readAll();

        if (result) {
            dto = new DTO(200, "Decks retrieved successfully.", result);
        } else {
            dto = new DTO(404, "Failed to retrieve decks.");
        }
    } catch (err) {
        dto = DTO.default(500);
    }

    console.log('Leaving Deck router get().');
    res.status(dto.code).json(dto);

});

router.post('/', async (req, res) => {

    console.log('Entering Deck router post().');

    let dto;

    // pull the request body
    if (!req.body.name) {
        dto = new DTO(400, '"name" is a required field.');
    } else {

        try {
            // attempt to persist
            const result = await service.create(req.body);

            // return json
            if (result) {
                dto = new DTO(201, 'Deck created. Data is new deck ID.', result);
            } else {
                dto = new DTO(400, 'Failed to create deck.');
            }
        } catch (err) {
            console.error(err);
            dto = DTO.default(500);
        }
    }

    console.log('Leaving Deck router post().');
    res.status(dto.code).json(dto);

});

router.get('/:id', async (req, res) => {

    let dto;

    const id = Number(req.params.id);

    if (!id || id <= 0 || !Number.isInteger(id)) {
        dto = new DTO(400, "Please include a valid id.");
    } else {

        try {

            const result = await service.readOne(id);

            if (result) {
                dto = new DTO(200, "Deck retrieved successfully.", result);
            } else {
                dto = new DTO(404, "Data not found.");
            }

        } catch (err) {
            console.error(err);
            dto = DTO.default(500);
        }
    }

    res.status(dto.code).json(dto);

});

router.put('/:id', async (req, res) => {

    console.log('Entering Deck router put().');

    let dto;

    // data validation
    let errors = [];

    if (!req.body.name) {
        errors = [...errors, "Property 'name' is a required field."];
    } else if (!req.params.id || Number(req.params.id) <= 0 || !Number.isInteger(id)) {
        errors = [...errors, "Valid property 'id' required."];
    }

    if (errors.length) {
        dto = DTO.default(400, errors);
    } else {

        try {

            // attempt to put
            const result = await service.update({ id: Number(req.params.id), name: req.body.name });

            // handle result
            if (result) {
                dto = new DTO(200, "Update successful.");
            } else {
                dto = new DTO(400, "No rows affected.");
            }

        } catch (err) {
            console.error(err);
            dto = DTO.default(500);
        }

    }

    // set response status & json
    console.log('Leaving Deck router put() with response code', dto.code);
    res.status(dto.code).json(dto);

});

router.delete('/:id', async (req, res) => {

    console.log('Entering Deck router delete().');

    let dto;

    const id = Number(req.params.id);

    // data validation
    if (!id || id <= 0 || !Number.isInteger(id)) {
        dto = new DTO(400, "'id' must be a valid, positive number");
    } else {

        try {

            const result = await service.delete(Number(req.params.id));

            if (result) {
                dto = new DTO(200, "Deletion successful.");
            } else {
                dto = new DTO(400, "Deletion failed. Item may not exist at given ID.");
            }
        } catch (err) {
            console.error(err);
            dto = DTO.default(500);
        }

    }

    // set response status & json
    console.log('Leaving Deck router delete() with response code', dto.code);
    res.status(dto.code).json(dto);

});

module.exports = router;