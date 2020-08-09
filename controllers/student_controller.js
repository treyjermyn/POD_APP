//student controller 
const db = require("../models/index");

const Op = db.Sequelize.Op;

//STUDENT ASSIGNED COURSES
exports.Users_Courses = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Returning User Courses ====="
            : ""
        }`
      );

      db.Course.findAll({
        where: {
            user_id: req.userId 
        },
        attributes: ["id", "course_name", "subject", "createdAt", "updatedAt"],
        include: [{
            model: db.User,
            attributes: ["first_name", "last_name"],
            through: {
                model: db.Users_Courses,
                attributes: ["isCompleted", "completedAt"],
            }
        }]
    }).then((courseData) => {
        if (courseData){
            res.status(200).json({
                "data": courseData,
            })
        }
    }).catch((err) => {
        res.status(500).send(`Error Retrieving Course information -> ${err}`);
    });
}

// //STUDENT ASSINGED LESSONS

// exports.Users_Lessons = (req, res) => {
//     console.log(
//         `${
//           process.env.APP_ENV === "development"
//             ? "===== Returning User Lessons ====="
//             : ""
//         }`
//       );
// }

