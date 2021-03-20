const express = require('express');
const routes = require("./routes");
const app = express();
const db = require('./models');

const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});