const db = require("../models");

module.exports = {
    createNewUser: function (req,res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber
        })
        .then(() => res.sendStatus(200))
        .catch(err => res.send(err));
    }
}
