// *****************************************************************************
// Server.js - App Starting point. Initializes Node JS server
//
// ******************************************************************************
// *** Importing Dependencies
// =============================================================
const express = require("express");
const sequelize_fixtures = require("sequelize-fixtures");
require("custom-env").env("dev"); //env vars for development

// Instantiating Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8000;

// Requiring models for syncing
// =============================================================
const db = require("./models");

//setting data parsing middlewares --JSON-- with Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //request body parser

//Setting static directory = public
app.use(express.static("public"));

// Routes
// =============================================================
require('./routes/auth_router.js')(app);

// Syncing DB models and then starting express server
// =============================================================
db.sequelize.sync({ force: true })
  .then(() => {
    sequelize_fixtures.loadFile("./db/fixtures/user_roles_fixtures.js", db)
      .then(() => {
        console.log("===== DB Seeded Properly =====");
        app.listen(PORT, () => {
          console.log(
            `===== SERVER ON => App listening on PORT ${PORT} :: ${process.env.APP_ENV} environment. =====`
          );
        });
      });
  }); 
