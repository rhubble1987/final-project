const express = require('express');

const app = express();

const http = require('http').Server(app);
const path = require('path');

const PORT = process.env.PORT || 3005;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname,'/public')));

const router = require('./routes/apiRoutes');
router(app);

db.sequelize.sync().then(() => {
  http.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});