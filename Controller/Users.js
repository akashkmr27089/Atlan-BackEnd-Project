var url = process.env.DB_URL;
const logger = require("../src/Logger");
var MongoClient = require('mongodb').MongoClient;
var database = process.env.DATABASE;

//About This Controller ::-->
// This Controller is Responsible for creating Users and checking if 
// User Exists in the Database 

// Creates user in the Database
function CreateUser(userId) {
    logger.info(`Creating Users ${userId}`)
    return new Promise(resolve => {
        MongoClient.connect(url, function (err, db) {
            var dbo = db.db(database);
            var myobj = { _id: userId };
            dbo.collection("users").insertOne(myobj, function (err, res) {
                if (err) {
                    logger.error(err.message);
                    db.close();
                    resolve({ response: false, Message: err.message });
                }
                logger.info(`Users ${userId} Created`);
                db.close();
                resolve({ response: true, Message: `Users ${userId} Created` });
            });
        });
    });
};

// This checks if the User Exists in the database
function IfUserExists(userId) {
    logger.info(`Checking If ${userId} exists`);
    return new Promise(resolve => {
        var query = { _id: userId }
        MongoClient.connect(url, function (err, db) {
            var dbo = db.db(database);
            dbo.collection("users").find(query).count(function (err, result) {
                if (err) {
                    logger.error(err.message);
                    db.close();
                    resolve({ response: false, Message: err.message });
                }
                if (result == 1)
                    resolve({ response: true, Message: `${userId} does exists` });
                else
                    resolve({ response: false, Message: `${userId} does not exists` });
                db.close();
            });
        });
    });
}

module.exports = {
    IfUserExists: IfUserExists,
    CreateUser: CreateUser
}