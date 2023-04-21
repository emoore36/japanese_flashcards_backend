const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'japanese_flashcards_backend',
    streams: [
        {
            level: 'info',
            stream: process.stdout,
        },
    ],
});

const getChildLogger = (logger, className) => {
    return logger.child(
        {
            class: className,
            level: 'debug'
        }
    );
};

const deckBusinessServiceLogger = getChildLogger(logger, 'DeckBusinessService');
const deckDataServiceLogger = getChildLogger(logger, 'DeckDataService');
const cardBusinessServiceLogger = getChildLogger(logger, 'CardBusinessService');
const cardDataServiceLogger = getChildLogger(logger, 'CardDataService');

module.exports = {
    logger,
    deckBusinessServiceLogger,
    cardBusinessServiceLogger,
    deckDataServiceLogger,
    cardDataServiceLogger
};