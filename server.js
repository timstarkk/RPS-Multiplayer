const express = require('express');
const logger = require('morgan');
const path = require('path');

var PORT = 3030;

// Initialize Express
var app = express();


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
console.log(__dirname);
app.use('/public', express.static(path.join(__dirname + "/public")));


// Routes
// =============================================================
require("./routes/html-routes.js")(app);

// ++++++++from tutorial+++++++++
// const admin = require('firebase-admin');

// const serviceAccount = require('');

// const firebaseAdmin = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://rpsf-7ec2f.firebaseio.com'
// })

isAuthenticated = () => {
    // user
}

// ++++++++from tutorial+++++++++


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT + __dirname);
})