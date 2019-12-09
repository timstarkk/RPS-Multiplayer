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

    app.use('/public', express.static('../public'));

};
