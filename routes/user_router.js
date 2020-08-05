//importing JWT Validator
const JwtTokenValidator = require("../middleware/fnVerifyJwtToken");
//importing user controller for redirection
const userController = require("../controllers/user_controller");

//router definition.
module.exports = (app) => {
    //defining default header properties for responses
    //including x-access-token and origin for CORS
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //Student Route
    app.get("/api/user/student", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isStudent], userController.studentPortal);

    //Intructor Route
    app.get("/api/user/instructor", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], userController.instructorPortal);
}