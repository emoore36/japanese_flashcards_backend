var express = require('express');
var router = express.Router();
const DTO = require('../models/DTO');
// const CardDataService = require('../data/services/CardDataService');
const CardBusinessService = require('../business/CardBusinessService');
const Card = require('../models/Card');
const NotFoundError = require('../errors/NotFoundError');

// const service = new CardDataService();
const service = new CardBusinessService();

router.post("/", async (req, res) => {

    let dto = DTO.default(405);

    // data validation
    const front_text = req.body.front_text;
    const back_text = req.body.back_text;
    const deck_id = Number(req.body.deck_id);

    let validationErrors = [];

    if (!front_text) {
        validationErrors = [...validationErrors, '[front_text] is a required string and cannot be blank.'];
    }
    if (!back_text) {
        validationErrors = [...validationErrors, '[back_text] is a required string and cannot be blank.'];
    }
    if (!deck_id || !Number.isInteger(deck_id) || deck_id <= 0) {
        validationErrors = [...validationErrors, '[deck_id] is a required, non-zero, positive integer.'];
    }

    if (validationErrors.length) {
        dto = DTO.default(400, validationErrors);
    } else {

        try {

            const result = await service.create(new Card(0, front_text, back_text, deck_id));

            if (result) {
                dto = DTO.default(201);
            } else {
                dto = DTO.default(400);
            }


        } catch (err) {

            if (err instanceof NotFoundError) {
                console.log(err.stack);
                dto = new DTO(400, "Deck does not exist at given [deck_id]. Card creation failed.");
            } else {

                // handle error
                console.error(err);
                dto = DTO.default(500);
            }

        }

    }

    res.status(dto.code).json(dto);

});

router.get("/", async (req, res) => {

    let dto = DTO.default(405);

    try {

        const result = await service.readAll();

        if (result.length) {
            dto = DTO.default(200, result);
        } else {
            dto = DTO.default(404);
        }
    } catch (err) {
        console.error(err);
        dto = DTO.default(500);
    }

    res.status(dto.code).json(dto);
});

router.get("/:id", async (req, res) => {

    let dto = DTO.default(405);

    // data validation
    const id = Number(req.params.id);

    if (!id || !Number.isInteger(id) || id <= 0) {
        dto = new DTO(400, '"id" must be a valid positive integer.');
    } else {

        try {

            const result = await service.readOne(id);

            if (result) {
                dto = DTO.default(200, result);
            } else {
                dto = DTO.default(404);
            }

        } catch (err) {
            console.error(err);
            dto = DTO.default(500);
        }

    }

    res.status(dto.code).json(dto);

});

router.get("/deck_id/:deck_id", async (req, res) => {

    let dto = DTO.default(405);

    // data validation
    const deck_id = Number(req.params.deck_id);

    if (!deck_id || !Number.isInteger(deck_id) || deck_id <= 0) {
        dto = new DTO(400, '"id" must be a valid positive integer.');
    } else {

        try {

            const result = await service.readAllbyDeckId(deck_id);

            if (result) {
                dto = DTO.default(200, result);
            } else {
                dto = DTO.default(404);
            }

        } catch (err) {
            console.error(err);
            dto = DTO.default(500);
        }

    }

    res.status(dto.code).json(dto);

});

router.put("/:id", async (req, res) => {

    let dto = DTO.default(405);

    // data validation
    const id = Number(req.params.id);
    const front_text = req.body.front_text;
    const back_text = req.body.back_text;
    const deck_id = Number(req.body.deck_id);

    let validationErrors = [];

    if (!id || !Number.isInteger(id) || id <= 0) {
        validationErrors = [...validationErrors, '[deck_id] is a required, non-zero, positive integer.'];
    }
    if (!front_text) {
        validationErrors = [...validationErrors, '[front_text] is a required string and cannot be blank.'];
    }
    if (!back_text) {
        validationErrors = [...validationErrors, '[back_text] is a required string and cannot be blank.'];
    }
    if (!deck_id || !Number.isInteger(deck_id) || deck_id <= 0) {
        validationErrors = [...validationErrors, '[deck_id] is a required, non-zero, positive integer.'];
    }

    if (validationErrors.length) {
        dto = DTO.default(400, validationErrors);
    } else {

        const result = await service.update(new Card(id, front_text, back_text, deck_id))
            .then((result) => {
                if (result) {
                    dto = DTO.default(200);
                } else {
                    dto = DTO.default(404);
                }
            }).catch((err) => {
                console.error(err);
                dto = DTO.default(500);
            });;

    }

    res.status(dto.code).json(dto);

});

module.exports = router;
