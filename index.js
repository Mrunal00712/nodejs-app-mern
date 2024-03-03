// import express from 'express';
// import bodyParser from 'body-parser';

// import db from "./mongoC.js";

// const port = 4001;
// const app = express();

// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
  
//     next();
//   });

// // Parses the text as url encoded data
// app.use(bodyParser.urlencoded({ extended: true }));
 
// // Parses the text as json
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello World, from express');
// })

// app.post('/addUser',async (req, res) => {
//     let collection = await db.collection("users");
//     let newDocument = req.body;
//     newDocument.date = new Date();
//     let result = await collection.insertOne(newDocument);
//     console.log("rreq"+req.body);
//     res.send(result).status(204);
// });

// app.get('/getUsers', async(req, res) => {
//     let collection = await db.collection("users");
//     let results = await collection.find({})
      
//       .toArray();
//     res.send(results).status(200);
// });

// app.listen(port, function () {
//     console.log("Server is listening at port:" + port);
// });



import express from 'express';
import bodyParser from 'body-parser';

import { connectToMongoDB } from "./mongoC.js"; // Import the function to connect to MongoDB

const port = 4001;
const app = express();

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
 
// Parses the text as json
app.use(bodyParser.json());

// Connect to MongoDB before setting up routes
connectToMongoDB().then(db => {
    app.get('/', (req, res) => {
        res.send('Hello World, from express');
    })

    app.post('/addUser',async (req, res) => {
        let collection = db.collection("users"); // Access the database object returned by connectToMongoDB
        let newDocument = req.body;
        newDocument.date = new Date();
        let result = await collection.insertOne(newDocument);
        console.log("rreq"+req.body);
        res.send(result).status(204);
    });

    app.get('/getUsers', async(req, res) => {
        let collection = db.collection("users"); // Access the database object returned by connectToMongoDB
        let results = await collection.find({}).toArray();
        res.send(results).status(200);
    });

    app.listen(port, function () {
        console.log("Server is listening at port:" + port);
    });
}).catch(err => {
    console.error(err);
    process.exit(1); // Exit the process if connection to MongoDB fails
});

