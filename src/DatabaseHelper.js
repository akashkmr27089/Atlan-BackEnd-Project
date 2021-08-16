var database = process.env.DATABASE;
var url =

    function checkDatabaseExists() {
        var flag = false;
        MongoClient.connect(url, function (err, db) {
            var dbo = db.db(database);           // Database Name 
            dbo.createCollection("orders", function (err, res) {
                if (err) console.log("Error At Creating database ", err.errmsg);
                else {
                    console.log("Collection created!");
                }
                db.close();
            });
        });
        return flag;
    }

module.exports = {
    checkDatabaseExists: checkDatabaseExists
}