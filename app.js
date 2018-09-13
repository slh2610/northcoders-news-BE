const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser')

const DB_URL = 'mongodb://localhost:27017/nc_news' //change to require '../config when config is set up'

app.use(bodyParser.json())

mongoose.connect(DB_URL)
  .catch(console.log)

app.use('/api', apiRouter);

app.get('/api', (req, res) => {
  res.status(200).send('Welcome to the homepage')
})


module.exports = app;