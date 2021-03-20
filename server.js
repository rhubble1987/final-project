const express = require('express');
const serveIndex = require('serve-index');

const app = express();

const http = require('http').Server(app);
const path = require('path');

const PORT = process.env.PORT || 3005;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));


/*
app.use(express.static(path.join(__dirname,'/public')));

db.sequelize.sync().then(() => {
  http.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});

*/