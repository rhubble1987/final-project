const passport = require("passport")

const jwtStrategy = require("./jwt");

passport.use(jwtStrategy)

module.exports = passport;