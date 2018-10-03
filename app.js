const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser')
const cors = require('cors')
const { handle404s, handle400s, handle500s } = require('./errors/index.js')

const DB_URL = process.env.DB_URL || require('./config.js')

app.use(bodyParser.json())

app.use(cors())

mongoose.connect(DB_URL)
  .then(() => console.log(`Connected to ${DB_URL}`))
  .catch(console.log)

app.use('/api', apiRouter);

app.get('/api', (req, res, next) => {
  res.status(200).send('Welcome to the homepage')
})

app.get('/*', (req, res, next) => {
  res.status(404).send('Page Not Found')
})

app.use(handle404s);
app.use(handle400s);
app.use(handle500s);

module.exports = app;