//Verify SignIn & Role verification Middleware functions
//====================================
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //to enconde password sent by user and compare with value in DB
//calling in models and jwt secret to verify if sign in information already exists
const db = require("../models/index");
const config = require("../config/config.json"); // only in case there is no .env defined with SECRET
const User = db.User
const Role = db.Role;
const SECRET = process.env.SECRET || config.development.secret;
//calling symbol based operators from Sequelize
const Op = db.Sequelize.Op;

//auth controller Middleware functions
exports.signup = (req, res) => {
  //saving new user to DB in case verification passed
  //logging to console if in dev env
  console.log(
    `${
      process.env.APP_ENV === "development"
        ? "===== Adding New User to DB ====="
        : ""
    }`
  );

  //using User model to save information
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      Role.findAll({
        where: {
          name: {
            [Op.eq]: req.body.role,
          },
        },
      })
        .then((roles) => {
          user.setRoles(roles).then(() => {
            res.status(200).send("User registered successfully!");
            //TODO: Send registration email.
          });
        })
        .catch((err) => {
          res.status(500).send("Error -> " + err);
        });
    })
    .catch((err) => {
      res.status(500).send("Fail! Error -> " + err);
    });
};


exports.signin = (req, res) => {
  //logging to console if in dev env
  console.log(
    `${
      process.env.APP_ENV === "development"
        ? "===== User Sign in ====="
        : ""
    }`
  );

  User.findOne({
    where: {
      email: req.body.email,
      //include: Role
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send("Login failed. User Not Found!");
      }

      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({
            auth: false,
            accessToken: null,
            reason: "Login failed. Invalid Password!",
          });
      }
      //if user exist and password is valid, return access token
      const jwToken = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });
      //getting user role
      user.getRoles().then((role) => {
        res.status(200).send({ auth: true, role: role[0].name, accessToken: jwToken });
      })
      .catch( (err) => {
        res.status(500).send("Error Verifying Role -> " + err);
      });
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
}

//testing routes
//===========================
exports.userContent = (req, res) => {
    //logging to console if in dev env
  console.log(
    `${
      process.env.APP_ENV === "development"
        ? "===== Returning Logged In user's content ====="
        : ""
    }`
  );

  User.findOne({
      where: {
          id: req.userId //this id comes from middleware after decoding JWT
      },
      attributes: ["first_name", "last_name", "email", "confirmed"],
      include: [{
          model: Role,
          attributes: ["name"],
          through: {
              attributes: ["userId", "roleId"],
          }
      }]
  }).then((user) => {
      if (user){
          res.status(200).json({
              "message": "User Information",
              "user": user,
          })
      }
  }).catch((err) => {
      res.status(500).send(`Error Retrieving user's information -> ${err}`);
  });
}
