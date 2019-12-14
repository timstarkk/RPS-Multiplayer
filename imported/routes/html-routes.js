const path = require('path');
const express = require('express');

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // blog route loads blog.html
    app.get("/welcome", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/welcome.html"));
    });

    // path that accepts user's login information (username, pass)
    // firebase is imported in this file and authentication is done here
    // if successful, change route to another page like '/welcome'
    // if error, send them back to the log in page, possibly with error text

    app.get("/login", function (req, res) {
        // res.sendFile(path.join(__dirname, "../public/login.html"));
        // // // res.window.alert(email + " / " + password);

        res.send('logging in')
    });

    app.use('/public', express.static('../public'));

};