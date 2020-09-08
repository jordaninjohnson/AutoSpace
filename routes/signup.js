// Requiring path to so we can use relative routes to our HTML files
const app = require("express");
const router = app.Router();
const db = require("../models");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verify = require("./verifySignup");

// Takes new user information and sends it to database
router.post("/api/signup", [verify.checkDuplicateUsernameOrEmail], (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        message: "Somthing wrong"
      });
    } else {
      db.User
        .create({
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          location: req.body.location,
          imageUrl: req.body.imageUrl
        })
        .then(user => {
          const token = jwt.sign({
            email: user.dataValues.email,
            userId: user.dataValues.id
          },
            'SecretPasswordNoOneWillEverGuess',
            {
              expiresIn: "1h"
            }
          )
          return res.status(200).json({
            message: "Auth Successful",
            token: token,
            id: user.dataValues.id,
            lastName: user.dataValues.lastName,
            firstName: user.dataValues.firstName
          })
        })
        .catch(() => {
          res.status(401).send({ message: "Somthing wrong" });
        });
    }
  })
});

module.exports = router;
