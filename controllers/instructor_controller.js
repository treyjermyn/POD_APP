//the instructor controller handles all DB transactions
//=============================================================
const db = require("../models/index");
//calling symbol based operators from Sequelize
const Op = db.Sequelize.Op;

//INSTRUCTOR COURSES
//==================================================
exports.instructorCourses = (req, res) => {
    //retrieve Courses list from DB
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Returning Instructor's Courses ====="
            : ""
        }`
      );

      db.Course.findAll({
        where: {
            user_id: req.userId //this id comes from middleware after decoding JWT
        },
        attributes: ["id","course_name", "subject", "createdAt", "updatedAt"],
        include: [{
            model: db.User,
            attributes: ["first_name", "last_name", "email"],
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

//COURSE ADDITION
//==================================================
exports.addCourse = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Adding New Instructor's Courses ====="
            : ""
        }`
      );
    //using Course model to save information
  db.Course.create({
    course_name: req.body.course_name.toUpperCase(),
    subject: req.body.subject.toUpperCase(),
    user_id: req.userId,
  })
    .then(() => {
        db.Course.findAll({
            where: {
                user_id: req.userId //this id comes from middleware after decoding JWT
            },
            attributes: ["id","course_name", "subject", "createdAt", "updatedAt"],
            include: [{
                model: db.User,
                attributes: ["first_name", "last_name", "email"],
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
    })
    .catch((err) => {
      res.status(500).send("Fail! Error -> " + err);
    });
}

//COURSE UPDATE
//==================================================
exports.updCourse = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Updating Courses ====="
            : ""
        }`
      );
    //course id will be past in route
    db.Course.update({
            course_name: req.body.course_name,
            subject: req.body.subject
        },
        {
            where: {
                id: req.body.course_id
            }
        }
    )
    .then( (rowsUpdated) => {
        if(rowsUpdated){
            db.Course.findOne({
                where: {
                    id: req.body.course_id //this id comes from middleware after decoding JWT
                },
                attributes: ["id","course_name", "subject", "createdAt", "updatedAt"],
                include: [{
                    model: db.User,
                    attributes: ["first_name", "last_name", "email"],
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
    } )
}