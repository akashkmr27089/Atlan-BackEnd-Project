var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// //For Creating Database
// MongoClient.connect(url, function (err, db) {
//     var dbo = db.db("atlan");           // Database Name 
//     dbo.createCollection("customers", function (err, res) {
//         if (err) console.log("Error At Creating database ", err.errmsg);
//         else {
//             console.log("Collection created!");
//         }
//         db.close();
//     });
// });


// //For Inserting data into the database 
// MongoClient.connect(url, function (err, db) {
//     var dbo = db.db("atlan");
//     var myobj = { name: "Company Inc", address: "Highway 37", age: "23" };
//     dbo.collection("customers").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });

// // For Inserting Multiple data into the database 
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     var myobj = [
//         { name: 'John', address: 'Highway 71' },
//         { name: 'Peter', address: 'Lowstreet 4' },
//         { name: 'Amy', address: 'Apple st 652' },
//         { name: 'Hannah', address: 'Mountain 21' },
//         { name: 'Michael', address: 'Valley 345' },
//         { name: 'Sandy', address: 'Ocean blvd 2', age: '23' },
//         { name: 'Betty', address: 'Green Grass 1' },
//         { name: 'Richard', address: 'Sky st 331' },
//         { name: 'Susan', address: 'One way 98' },
//         { name: 'Vicky', address: 'Yellow Garden 2' },
//         { name: 'Ben', address: 'Park Lane 38' },
//         { name: 'William', address: 'Central st 954' },
//         { name: 'Chuck', address: 'Main Road 989' },
//         { name: 'Viola', address: 'Sideway 1633' }
//     ];
//     dbo.collection("customers").insertMany(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//         db.close();
//     });
// });


// // Finding Singele Element form the form 
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     dbo.collection("customers").findOne({}, function (err, result) {
//         if (err) throw err;
//         console.log(result.name);
//         db.close();
//     });
// });

// // Finding Multiple Element form the form 
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     dbo.collection("customers").find({}).toArray(function (err, result) {
//         if (err) throw err;
//         result.forEach(function (element) {
//             // console.log(element.name)
//         });
//         db.close();
//     });
// });

// // Finding Multiple Element form the form with the schema
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     dbo.collection("customers").find({}, { projection: { _id: 1, name: 1 } }).toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });


// // Querry
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     var query = { name: "Ben" };
//     var query = { address: /^S/ }
//     dbo.collection("customers").find(query).toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });

// //Sorting
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     var mysort = { name: 1 }  // Use 1 and -1 for Ascending and Descending 
//     dbo.collection("customers").find({}, { projection: { _id: 0, name: 1 } }).sort(mysort).toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });

// //Deleting 
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     var myquery = { address: /^O/ };
//     dbo.collection("customers").deleteMany(myquery, function (err, obj) {
//         if (err) throw err;
//         console.log(obj + " document(s) deleted");
//         db.close();
//     });
// });

//////////////////////////////////////////

// For Updating the Value
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     var myquery = { name: "William" };
//     var newvalues = { $set: { name: "Aakash", address: "Canyon 123" } };
//     dbo.collection("customers").updateOne(myquery, newvalues, function (err, res) {
//         if (err) throw err;
//         console.log("1 document updated");
//         db.close();
//     });
// });


// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db('atlan');
//     dbo.collection("customers").find({ name: "Aakash" }).toArray(function (err, result) {
//         if (err) throw err;
//         result.forEach(function (element) {
//             console.log(element);
//         });
//         db.close();
//     });
// });

///////////////////////////////////////////////

// For Updating the Value
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     var myquery = { name: "William" };
//     var newvalues = { $set: { name: "Namrata", address: "Canyon 123" } };
//     dbo.collection("customers").updateMany(myquery, newvalues, function (err, res) {
//         if (err) throw err;
//         console.log(res.modifiedCount);
//         db.close();
//     });
// });


// Show all with Limits 
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db('atlan');
//     dbo.collection("customers").find({ name: "Namrata" }).limit(3).toArray(function (err, result) {
//         if (err) throw err;
//         result.forEach(function (element) {
//             console.log(element);
//         });
//         db.close();
//     });
// });




// // Multiple commands inside the MongoDb Connect 


// MongoClient.connect(url, function (err, db) {
//     if (err) throw errr;
//     console.log("Database connected");
//     var dbo = db.db("atlan");
//     dbo.collection('customers').find({}).limit(3).toArray(function (err, res) {
//         if (err) throw err;
//         res.forEach(function (element) {
//             console.log(element.name);
//         })
//         // db.close()
//     });

//     dbo.collection('customers').find({}).limit(3).toArray(function (err, res) {
//         if (err) throw err;
//         console.log(res);
//         db.close();
//     });
// });