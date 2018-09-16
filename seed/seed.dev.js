const seedDB = require('./seed');
const mongoose = require('mongoose');
const DB_URL = require('../config.js')
const {userData, topicsData, commentsData, articlesData} = require('./devData')

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    return seedDB(userData, topicsData, articlesData, commentsData)
  })
  .then(() => {
    console.log('Database successfully seeded!')
    mongoose.disconnect()
  }) 