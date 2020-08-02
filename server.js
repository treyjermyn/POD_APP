// *****************************************************************************
// Server.js - App Starting point. Initializes Node JS server
//
// ******************************************************************************
// *** Importing Dependencies
// =============================================================
const express = require("express");
require("custom-env").env("dev"); //env vars for development

// Instantiating Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8000;

//setting data parsing middlewares --JSON-- with Express
app.use(express.urlencoded( { extended: true } ));
app.use(express.json()); //request body parser


//Setting static directory = public
app.use(express.static("public"));


// Routes
const path = require("path");

module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname,'../public/index.html'));
  });

 

};
// =============================================================


// Server Initiated - Listening for incoming requests
// =============================================================
app.listen(PORT, () => {
    console.log(`SERVER ON => App listening on PORT ${PORT} :: ${process.env.APP_ENV} environment.`)
});