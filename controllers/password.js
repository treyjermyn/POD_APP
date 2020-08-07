// const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API_KEY);
const db = require("../models/index");
const User = db.User

// PASSWORD RESET AND RECOVER

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
  User.findOne({
          email: req.body.email
  })
    .then(user => {
        if (!user) {
            return res.status(401).send("The email address " + req.body.email + " is not associated with any account. Double-check your email address and try again.")
        }

      //GENERATE AND SET PW RESET TOKEN
      user.generatePasswordReset();

      //SAVE UPDATED USER OBJECT
      user.save()
        .then(user => {
          //SEND EMAIL
          let link =
            "http://" +
            req.headers.host +
            "/api/auth/reset/" +
            user.resetPasswordToken;
          const mailOpt = {
            to: user.email,
            from: process.env.FROM_EMAIL,
            subject: "Password change request",
            text: `Hi ${user.email} \n
                    Please click on the following link ${link} to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          };

          sgMail.send(mailOpt, function(err, res) {
            if (err) {
                return res.status(500).json({ message: err });
            }
            res.status(200).json({message: "A reset email has been sent to " + user.email + "."});
          });
        })
        .catch(err => res.status(500).json({ message: err.message }));
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then(user => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Password reset token is invalid or has expired." });
    }

      //Redirect user to form with the email address
      res.render("reset", { user });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }).then(user => {
    if (!user) {
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    //SET NEW PASSWORD
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    //SAVE
    user.save(err => {
      if (err) {
          return res.status(500).json({ message: err.message });
      }
    });

    //SEND EMAIL
    const mailOpt = {
      to: user.email,
      from: process.env.FROM_EMAIL,
      subject: "Your password has been changed",
      text: `Hi ${user.email} \n
            This is a confirmation that the password for your account ${user.email} has been changed.\n`,
    };

    sgMail.send(mailOpt, (err, res) => {
      if (err) {
          return res.status(500).json({ message: err.message });
      }

      res.status(200).json({ message: "Your password has been updated" });
    });
  });
};
