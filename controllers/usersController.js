const db = require("../models");

module.exports = {
    createNewUser: function (req,res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        .then(() => res.sendStatus(200))
        .catch(err => res.send(err));
    },
    validateLogin: function (req, res) {
        db.User.findAll({
            where: {
                email: req.body.email,
                password: req.body.password
            },
            attributes: {
                exclude: ['password']
            }
        })
        .then((user) => {
            if (user.length === 1) {
                res.status(200).json({status: 'Login success', user: user[0]});
            } else {
                res.status(404).json({ status: 'Login failed, please try again', user: null });
            }
        })
        .catch(err => res.end(err.message));
    }
}
