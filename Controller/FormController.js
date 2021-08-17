var url = process.env.DB_URL;
var assert = require('assert');
const logger = require("../src/Logger");
var MongoClient = require('mongodb').MongoClient;
var database = process.env.DATABASE;
const User = require('./UsersController');

//Function Used for Creating Form if the User Exists
async function createForm(userId) {
    var IfUserExists_flag = await User.IfUserExists(userId);
    return new Promise(resolve => {
        console.log("IfUserExists_flag", IfUserExists_flag);
        if (IfUserExists_flag.response) {
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    logger.error(err.message);
                    db.close();
                    resolve({ response: false, Message: err.message });
                } else {
                    var dbo = db.db(database);
                    console.log("database", database);
                    var data = { userId: userId, questionAnsId: [] }
                    dbo.collection("Forms").insertOne(data, (err, result) => {
                        if (err) {
                            logger.error(err.message);
                            db.close();
                            resolve({ response: false, Message: err.message });
                        } else {
                            logger.info(result);
                            resolve({ response: true, Message: result });
                            db.close();
                        }
                    });
                }
            });
        } else {
            logger.error("Cannot Create Form :" + IfUserExists_flag)
            resolve(IfUserExists_flag);
        }
    });
}

//Function to delete all the questions and Answers 
async function deleteQandA(formData) {
    return true;
}

//Function Used to Delete Form if Form Exists 
// Make sure to delete all the Questions and Answers with Respect to it
async function deletForm(FormId) {
    logger.info(`Checking ${FormId} exists in the Database`);
    return new Promise(resolve => {
        MongoClient.connect(url, async (err, db) => {
            if (err) {
                logger.error(err.message);
                db.close();
                resolve({ response: false, Message: err.message });
            } else {
                var dbo = db.db(database);
                var querry = { _id: FormId }
                console.log("Querry for deleting :", querry);
                dbo.collection("Forms").find(querry).count(async (err, result) => {
                    if (err) {
                        logger.error(err);
                        db.close();
                        resolve({ response: false, Message: err });
                    } else {
                        if (result == 1) {
                            // Function to delete all the Quesitons and Answer Responses
                            await deleteQandA("TEST");
                            dbo.collection("Forms").deleteOne(querry, (err, res) => {
                                if (err) {
                                    logger.error(err);
                                    db.close();
                                    resolve({ response: false, Message: err });
                                } else {
                                    resolve({ response: true, Message: res });
                                    db.close();
                                }
                            });
                        } else {
                            resolve({ response: false, Message: `Cannot find Any Record for User ID ${FormId}` })
                        }
                    }
                });
            }
        })
    });
}

//Add Questions
//Update Questions
//Delete Quesitons 
//Get Questions based on FormId

module.exports = {
    createForm: createForm,
    deletForm: deletForm,
}