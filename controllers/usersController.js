const db = require("../models");
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
const moment = require('moment');

const genToken = (user) => {
  return jwt.sign({
    iss: 'Joan_Louji',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'joanlouji');
};

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
        if (user.length >= 1) {
          const ret = {
            status: 'Login success',
            user: user[0],
            jwt: genToken(user[0])
          };
          res.status(200).json(ret);

        } else {
          res.status(404).json({ status: 'Login failed, please try again', user: null });
        }
      })
      .catch(err => res.end(err.message));
  }
};
