// //Make Two databases and combine them
// var ordersTemp =
//     [
//         { _id: 1, product_id: 154, status: 1 }
//     ]
// var products =
//     [
//         { _id: 154, name: 'Chocolate Heaven' },
//         { _id: 155, name: 'Tasty Lemons' },
//         { _id: 156, name: 'Vanilla Dreams' }
//     ]

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//For Creating Database
// MongoClient.connect(url, function (err, db) {
//     var dbo = db.db("atlanTest");           // Database Name 
//     dbo.createCollection("orders", function (err, res) {
//         if (err) console.log("Error At Creating database ", err.errmsg);
//         else {
//             console.log("Collection created!");
//         }
//         db.close();
//     });
// });

// MongoClient.connect(url, function (err, db) {
//     var dbo = db.db("atlanTest");           // Database Name 
//     dbo.createCollection("products", function (err, res) {
//         if (err) console.log("Error At Creating database ", err.errmsg);
//         else {
//             console.log("Collection created!");
//         }
//         db.close();
//     });
// });

// //For Inserting data into the database 
// MongoClient.connect(url, function (err, db) {
//     var dbo = db.db("atlanTest");
//     dbo.collection("orders").insertMany(ordersTemp, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });

// // For Inserting Multiple data into the database 
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlanTest");
//     dbo.collection("products").insertMany(products, function (err, res) {
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//         db.close();
//     });
// });

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     
//     dbo.collection('orders').aggregate([
//         {
//             $lookup:
//             {
//                 from: 'products',
//                 localField: 'product_id',
//                 foreignField: '_id',
//                 as: 'orderdetails'
//             }
//         }
//     ]).toArray(function (err, res) {
//         if (err) throw err;
//         console.log(JSON.stringify(res));
//         db.close();
//     });
// });

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


// function IfUserExists(userId, dbo) {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("atlan");
//         // var query = { name: "Ben" };
//         var query = { userId: userId }
//         dbo.collection("customers").find(query).toArray(function (err, result) {
//             if (err) throw err;
//             console.log(result);
//             db.close();
//         });
//     });
// }

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("atlan");
    // var query = { name: "Ben" };

    dbo.collection("users").find(query).count(function (err, result) {
        if (err) throw err;
        if (result == 1)
            resolve(true);
        else
            resolve(false);
        db.close();
    });
});

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("atlan");
//     // var query = { name: "Ben" };
//     var query = { _id: "akashkmr2792323@gmail.com" }
//     dbo.collection("users").insertOne(query, function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });