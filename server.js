const express = require('express');
const routes = require("./routes");
const app = express();
const db = require('./models');
const schedule = require('node-schedule');
const sendMorningText = require('./utilities/sendMorningText');
const sendAfternoonText = require('./utilities/sendAfternoonText');

const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

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
  app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});