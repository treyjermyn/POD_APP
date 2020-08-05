//Verify SignUp Middleware functions
//====================================
const jwt = require('jsonwebtoken');
//calling in models to verify if sign in information already exists
const db = require("../models/index");
const config = require("../config/config.json");
const User = db.User;
const Role = db.Role;
const SECRET = process.env.SECRET || config.development.secret;
const JwtTokenValidator = {};

const fnVerifyToken = (req, res, next) => {
    //retrieve token from request header
    let jwtoken = req.headers["x-access-token"];

    if (!jwtoken) {
        //permission denied. token can't be verified
        return res.status(403).send({
            auth: false,
            message: "No access-token provided"
        })
    }

    //verify token
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err){
          return res.status(500).send({
              auth: false,
              message: "Token Authentication Failed. Error -> " + err
            });
        }
        req.userId = decoded.id;
        console.log("userId "+ req.userId);
        next();
    });  
}

//TODO: Complete this function
const isStudent = (req, res, next) => {
    console.log(req)
    //checking user's role
    // User.findAll({
    //     where:  {UserId: req.userid},
    //     include: [Role] 
    // })
    //     .then( user => {
    //         console.log(user);
    //         res.status(200).send(user);
    //     })
    //next();
}

//TODO: Complete this function
// const isInstructor = (req, res, next) => {
//     //checking user's role
//     User.findByPk(req.userId, { include: [Role] })
//         .then( user => {
//             console.log(user);
//             res.status(200).send(user);
//         })
//     next();
// }

JwtTokenValidator["fnVerifyToken"] = fnVerifyToken;
JwtTokenValidator["isStudent"] = isStudent;

module.exports = JwtTokenValidator;