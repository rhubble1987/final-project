require('dotenv').config({ path: './.env'});
const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');

const app = express();

const http = require('http').Server(app);
const path = require('path');
const routes = require('./routes');

const PORT = process.env.PORT || 3005;

const db = require('./models');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
//app.use(express.static(path.join(__dirname,'/public')));


app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));




