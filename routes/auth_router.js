//Importing helping functions from utils
//===========================================
const VerifySignUp = require("../utils/fnVerifySignUp");
const JwtTokenValidator = require("../utils/fnVerifyJwtToken");

//auth routes
module.exports = (app) => {
    //including controller here to be exported
    const authController = require("../controllers/auth_controller");

    //defining route for signup
    app.post("/api/auth/signup", [VerifySignUp.fnCheckDuplicateEmail, VerifySignUp.fnCheckRoles], authController.signup);

    //defining route for signin
    app.post("/api/auth/signin", authController.signin)

    //Defining test routes
    // app.get('/api/test/student', [JwtTokenValidator.fnVerifyToken], authController.studentContent);
    //app.get('/api/test/student', [JwtTokenValidator.isStudent], () => {console.log("Next Function for Student!")});
    //app.get('/api/test/admin', [JwtTokenValidator.verifyToken, JwtTokenValidator.isAdmin], authController.adminBoard);
}
