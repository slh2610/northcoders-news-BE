const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser')
const { handle404s, handle400s, handle500s } = require('./errors/index.js')

const DB_URL = require('./config')

app.use(bodyParser.json())

mongoose.connect(DB_URL)
  .catch(console.log)

app.use('/api', apiRouter);

app.get('/api', (err, req, res) => {
  res.status(200).send('Welcome to the homepage')
})

app.use(handle404s);
app.use(handle400s);
app.use(handle500s);

module.exports = app;