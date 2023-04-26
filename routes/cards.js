var express = require('express');
var router = express.Router();
const DTO = require('../models/DTO');
const CardBusinessService = require('../business/CardBusinessService');
const Card = require('../models/Card');
const NotFoundError = require('../errors/NotFoundError');
const CardValidator = require('../models/validators/CardValidator');

const service = new CardBusinessService();

router.post("/", async (req, res) => {

    let dto = DTO.default(405);

    // data validation
    const validationResult = CardValidator.validate(req.body);

    if (validationResult.hasErrors) {
        dto = DTO.default(400, validationResult.errorsList);
    } else {
        try {

            // attempt to persist
            const result = await service.create(new Card(0, front_text, back_text, deck_id));

            // set DTO
            dto = result ? DTO.default(201) : DTO.default(400);

        } catch (err) {

            // if user attempted to create card with ID of deck not found, inform user in error.
            // Otherwise, something else went wrong, inform the user as usual.
            if (err instanceof NotFoundError) {

                // print error
                console.log(err.stack);

                // set DTO
                dto = new DTO(400, "Deck does not exist at given [deck_id]. Card creation failed.");
            } else {

                // print error
                console.error(err);

                // set DTO
                dto = DTO.default(500);
            }

        }

    }

    // set response
    res.status(dto.code).json(dto);

});

router.get("/", async (req, res) => {

    let dto = DTO.default(405);

    try {

        // attempt to get
        const result = await service.readAll();

        // set DTO
        dto = result ? DTO.default(200, result) : DTO.default(404);

    } catch (err) {

        // log error
        console.error(err);

        // set DTO
        dto = DTO.default(500);
    }

    // set response
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

    // set response
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

            // attempt to get
            const result = await service.readAllbyDeckId(deck_id);

            // set DTO
            dto = result ? DTO.default(200, result) : DTO.default(404);

        } catch (err) {

            // print error
            console.error(err);

            // set DTO
            dto = DTO.default(500);
        }
    }

    // set response
    res.status(dto.code).json(dto);

});

router.put("/:id", async (req, res) => {

    let dto = DTO.default(405);

    // data validation
    const validationResult = CardValidator.validate(req.body).includeId(req.params.id);

    if (validationResult.hasErrors) {
        dto = DTO.default(400, validationResult.errorsList);
    } else {

        // attempt to persist
        const result = await service.update(new Card(id, front_text, back_text, deck_id))
            .then((result) => {
                dto = result ? DTO.default(200, result) : DTO.default(404);
            }).catch((err) => {
                console.error(err);
                dto = DTO.default(500);
            });;
    }

    res.status(dto.code).json(dto);

});

module.exports = router;
