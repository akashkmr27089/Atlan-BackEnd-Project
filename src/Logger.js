const { Timestamp } = require('mongodb');
const {
    createLogger,
    transports,
    format
} = require('winston');


const logger = createLogger({
    transports: [
        new transports.File({
            filename: `Logger_Data.log`,
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});

module.exports = logger;