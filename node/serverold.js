import {MongoClient} from 'mongodb';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors')
const axios = require('axios')
const app = express();
const mongo = require('mongodb');
const assert = require('assert');

const ENDPOINT = 'http://datamall2.mytransport.sg/ltaodataservice/Traffic-Images'
const mongourl = 'mongodb://localhost:27017/test';

//let MongoClient = require('mongodb').MongoClient;
let dburl = "mongodb://localhost:27017/traffic";

// MongoClient.connect(dburl, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });


// MongoClient.connect(dburl, function(err, db) {
//     assert.equal(null,err);
//     db.collection('traffic').insertOne([
//         {
//             id:1,
//             name:'gova'
//         }
//     ]).then(response => {
//         console.info('traffic',response.insertedCount);
//         db.close();
//     })
//   });

const PORT = process.env.PORT || 3000

app.use(cors())

app.get('/api',(req,res)=>{
    axios({
        method:'get',
        url:ENDPOINT,
        headers: {
            'AccountKey': 'VIAxNN0MR+GOufFLBdV9Nw==',
        },
        json: true
    })
    .then(function(response){
        const traffic = response.data.value
        res.send({traffic: traffic})
    })
})

router.post('/insert',function(req,res,next){
    debugger;
var inserturl = "mongodb://localhost:27017/test";
    var item = { name: "Company Inc", address: "Highway 37" };
    MongoClient.connect(inserturl, function(err, db) {
        assert.equal(null,err);
        //if (err) throw err;
       // var dbo = db.db("traffic");
       // var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("customers").insertOne(item, function(err, res) {
            assert.equal(null,err);
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
})

// router.post('/insert',function(req,res,next){
//     var item = { name: "Company Inc", address: "Highway 37" };
//     MongoClient.connect(dburl,function(err,db){
//         assert.equal(null,err);
//         db.collection('traffic-data').insertOne(item,function(err,result){
//             assert.equal(null,err);
//             console.log('traffic data inserted');
//             db.close();
//         })
//     })
// })

// router.get('/getdata',function(req,res,next){
//     let resultArray = [];
//     mongo.connect(mongourl,function(err,db){
//         assert.equal(null,err);
//         let cursor = db.collection('traffic-data').find();
//         cursor.forEach(function(doc,err){
//             assert.equal(null,err);
//             resultArray.push(doc);
//         },function(){
//             db.close();
//             res.render('index',{items:resultArray});
//         }
//     )
//     })
// })

app.get('/', (req, res) => res.send('Connection Established!'))

app.listen(PORT, function () {
	console.log('Server listening on port 3000');
});

module.exports = router;