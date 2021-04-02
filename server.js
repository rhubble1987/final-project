require('dotenv').config({ path: './.env'});
const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const expressSession = require( 'express-session');
const bodyParser = require('body-parser');
const User = require('./models/user')
const passport = require("./passportStrategies");
const jwt = require('jsonwebtoken');

const app = express();
const schedule = require('node-schedule');
const sendMorningText = require('./utilities/sendMorningText');
const sendAfternoonText = require('./utilities/sendAfternoonText');

//middleware
genToken = user => {
  return jwt.sign({
    iss: 'Joan_Louji',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'joanlouji');
}
app.use(bodyParser.json())
app.get('/',(req,res)=>{
  res.send('Hello world')
})
app.post('/register', async function (req, res, next) {
  const { email, password } = req.body;
  
  //Check If User Exists
  let foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use'});
  }
 
  const newUser = new User({ email, password})
  await newUser.save()
  // Generate JWT token
  const token = genToken(newUser)
  res.status(200).json({token})
});

const http = require('http').Server(app);
const path = require('path');
const routes = require('./routes');

const PORT = process.env.PORT || 3005;

const db = require('./models');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(express.static(path.join(__dirname,'/public')));

const rule = new schedule.RecurrenceRule();
rule.hour = 8;
rule.minute = 45;

const rule2 = new schedule.RecurrenceRule();
rule.hour = 12;
rule.minute = 45;

schedule.scheduleJob(rule, function() {
  sendMorningText();
});

schedule.rescheduleJob(rule2, function() {
  sendAfternoonText();
});


db.sequelize.sync().then(() => {
  http.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});


