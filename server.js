
const express = require('express');
const path = require("path");
const cors = require('cors');





const User = require('./models/user')

const jwt = require('jsonwebtoken');

const app = express();
const schedule = require('node-schedule');
const sendMorningText = require('./utilities/sendMorningText');


//middleware
genToken = user => {
  return jwt.sign({
    iss: 'Joan_Louji',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'joanlouji');
}

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

const routes = require('./routes');

const PORT = process.env.PORT || 3005;

const db = require('./models');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


app.use(routes);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build"));
});


const rule = new schedule.RecurrenceRule();

rule.hour = 8;
rule.minute = 45;



schedule.scheduleJob(rule, function() {
  sendMorningText();
  console.log('Function executed');
});


db.sequelize.sync().then(() => {
  http.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});


