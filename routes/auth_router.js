//Importing helping functions from utils
//===========================================
const VerifySignUp = require("../middlewares/fnVerifySignUp");
const JwtTokenValidator = require("../middlewares/fnVerifyJwtToken");
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

//auth routes
module.exports = (app) => {
    //including controller here to be exported
    const authController = require("../controllers/auth_controller");

    //defining route for signup
    app.post("/api/auth/signup", [VerifySignUp.fnCheckDuplicateEmail, VerifySignUp.fnCheckRoles], authController.signup);

    //defining route for signin
    app.post("/api/auth/signin", authController.signin)

    //Defining test routes
    app.get('/api/test/user', JwtTokenValidator.fnVerifyToken, authController.userContent);

    app.get('/verify-email', async(req, res , next) => {
        try {
            const user = await user.findOne({emailToken: req.query.token});
            if (!user) {
                req.flash('error', 'Token is invalid');
                return res.redirect('/');
            }
            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            await req.login(user, async (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to POD Learning ${user.username');
            const redirectUrl = req.session.redirectTo || '/';
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
            });
        } catch (error) {
            console.log(error);
            req.flash('error', 'Something went wrong')
            res.redirect('/');
        }
    })
}