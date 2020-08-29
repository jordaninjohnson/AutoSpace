const db = require("../models");

module.exports = {
    checkDuplicateUsernameOrEmail: function (req, res, next) {
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Email is already in use."
                });
                return;
            }
            next();
        }).catch(err => res.status(500).json(err));
    }
}