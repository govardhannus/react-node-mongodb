const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors')
const axios = require('axios')
const app = express();
const mongo = require('mongodb');
const assert = require('assert');

// Body parser middleware
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const ENDPOINT = 'http://datamall2.mytransport.sg/ltaodataservice/Traffic-Images'
const PORT = process.env.PORT || 3000

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";

//Connect MongoDb database 
MongoClient.connect(url, function (err, db) {
  if (err) throw err;

  // Fetching the data from the LTA DataMall API
  axios({
    method: 'get',
    url: ENDPOINT,
    headers: {
      'AccountKey': 'VIAxNN0MR+GOufFLBdV9Nw==',
      'Access-Control-Allow-Origin': 'http://localhost:3001'
    },
    json: true
  })
    .then(function (response) {
      var traffic = response.data.value
      //Inserting the LTA DataMall fetched data to MongoDB database in every 5 minutes.
      setInterval(function () {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/test";

        // Deleting the  MongoDB table before inserting into MOgoDB.
        MongoClient.connect(url, function (err, db) {
         // if (err) throw err;
          var myobj = traffic;
          db.collection("traffic", function (err, collection) {
            collection.remove({}, function (err, removed) {
            });
          });
        });
        // After deleting data the MongoDB here were inserting the data  
        MongoClient.connect(url, function (err, db) {
         // if (err) throw err;
          var myobj = traffic;
          for (var i = 0; i < myobj.length; i++) {
            var newobj = {
              CameraID: myobj[i].CameraID,
              ImageLink: myobj[i].ImageLink,
              loc: {
                Latitude: myobj[i].Latitude,
                Longitude: myobj[i].Longitude
              }
            }

            db.collection("traffic").insertOne(newobj, function (err, res) {
              //if (err) throw err;
            });
          }
          console.log("Data is inserted into MongoDB");
          //db.collection("traffic").ensureIndex({ loc: "2d" });
          db.close();
        });
      }, 300000)
    })
  db.close();
});

// fetching data from the MongoDB get api
app.get('/getdata', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/test";
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('unable to connect', err)
    } else {
      console.log('connect is enabled', url)
    }
    var collection = db.collection('traffic');
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    console.log("lat" + latitude)
    console.log("long" + longitude)
    db.collection("traffic").ensureIndex({ loc: "2d" });
    collection.find({ loc: { $near: [parseFloat(latitude), parseFloat(longitude)] } }).limit(10).toArray(function (err, result) {
      res.json({
        "traffic": result
      });
    })
  })
})

// Default path for the server
app.get('/', (req, res) => res.send('Connection Established!'));

//Server Listening on Port 3000 
app.listen(PORT, function () {
  console.log('Server listening on port 3000');
});