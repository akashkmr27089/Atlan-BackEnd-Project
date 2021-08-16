var url = process.env.DB_URL;
const logger = require("../src/Logger");
var MongoClient = require('mongodb').MongoClient;
var database = process.env.DATABASE;

function FetchData() {
    console.log(database)
    var data = null;
    return new Promise(resolve => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw errr;
            console.log("Database connected");
            var dbo = db.db(database);
            dbo.collection('customers').find({}).limit(3).toArray(function (err, res) {
                if (err) throw err;
                res.forEach(function (element) {
                    // console.log(element.address);
                })
                // db.close()
            });

            dbo.collection('customers').find({}).limit(3).toArray(function (err, res) {
                if (err) throw err;
                // console.log(res);
                data = res;
                resolve(res);
                db.close();
            });
        });
        // resolve(data);
    });
}

function test() {
    return "test";
}

//Function for Checking if Database Exists 
function checkingDataBase() {

}

// module.exports = test;
// module.exports = FetchData;
module.exports = {
    test: test,
    FetchData: FetchData
}