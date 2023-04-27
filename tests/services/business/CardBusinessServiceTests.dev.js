const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const { describe, it, beforeEach } = require('mocha');

const Card = require('../../../models/Card');
const CardBusinessService = require('../../../business/CardBusinessService');
const CardDataService = require('../../../data/services/CardDataService');

// let repo;
// let service;

let repo = sinon.stub(new CardDataService());
let service = new CardBusinessService(repo);

describe('CardBusinessService', () => {
    // define repo and service for testing
    beforeEach(() => {
        repo = sinon.stub(new CardDataService());
        service = new CardBusinessService(repo);
    });

    describe('create', () => {
        it('should return a valid card', async () => {
            // set up parameter data
            const paramData = {
                front_text: 'test_front',
                back_text: 'test_back',
                deck_id: 1
            };

            // set up return data
            const expected = Card.of({
                id: 1,
                front_text: 'test_front',
                back_text: 'test_back',
                deck_id: 1
            });

            // stub create method
            const createStub = repo.create.resolves(expected);

            // make service call
            const actual = await service.create(paramData);

            // make assertions
            expect(actual).to.deep.equal(expected);

            createStub.restore();
        });
    });

    describe('readAll', () => {
        it('should return all cards from the repository', async () => {
            // Set up test data
            const expectedCards = [
                { id: 1, front_text: 'Front1', back_text: 'Back1', deck_id: 1 },
                { id: 2, front_text: 'Front2', back_text: 'Back2', deck_id: 1 },
                { id: 3, front_text: 'Front3', back_text: 'Back3', deck_id: 2 }
            ];

            // Stub out the repo's readAll method to return our test data
            const readAllStub = repo.readAll.resolves(expectedCards);

            // Call the readAll method of the CardBusinessService
            const actualCards = await service.readAll();

            // Verify that the CardRepository's findAll method was called once
            expect(readAllStub.calledOnce).to.be.true;

            // Verify that the actualCards returned from the readAll method matches the expectedCards
            expect(actualCards).to.deep.equal(expectedCards);

            readAllStub.restore();
        });
    });
});
