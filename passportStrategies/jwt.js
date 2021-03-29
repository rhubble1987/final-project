const passport = require('passport')
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('../models/')

const jwtStrat = new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'joanlouji'
    },
    function (jwtPayload, done) {
        console.log("jwt passport:",jwtPayload);
        const userId = jwtPayload.sub

        db.User.findAll({
            where: {
                id: userId
            }
        }).then((users)=>{
            console.log(users)
            if(users.length === 0){
                throw new Error("User with id " + userId + " does not exist")
            }
            if(users.length > 1){
                throw new Error("Database Error, more than one user with id " + userId + " exists")
            }
            done(null, users[0])
        }).catch(err => {
            return done(err);
        });
    }
);

// console.log(jwtStrat)
module.exports = jwtStrat;
