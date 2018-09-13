const seedDB = require('./seed');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/nc_news'
const {userData, topicsData, commentsData, articlesData} = require('./devData')

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    return seedDB(userData, topicsData, articlesData, commentsData)
  })
  .then(() => {
    console.log('Database successfully seeded!')
    mongoose.disconnect()
  }) 