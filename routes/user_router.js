//importing JWT Validator
const JwtTokenValidator = require("../middlewares/fnVerifyJwtToken");
//importing user controller for redirection
const userController = require("../controllers/user_controller");

//router definition.
module.exports = (app) => {
    //defining default header properties for responses
    //including x-access-token and origin for CORS
   
    //importing user controller for redirection
    const userController = require("../controllers/user_controller");
    const instructorController = require("../controllers/instructor_controller");

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

    //Instructor course list
    app.get("/api/user/instructor/courses", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.instructorCourses);

    //Instructor Course creation route
    app.post("/api/user/instructor/courses", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.addCourse);

    //Instructor Course update route
    app.post("/api/user/instructor/courses/update", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.updCourse);
    
    //Instructor Lessons route
    app.get("/api/user/instructor/lessons", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.getLessonsByCourse);
}