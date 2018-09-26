const { User, Topic, Article, Comments } = require('../models');
const {formatArticleData, formatCommentData} = require('../utils/utils.js')
const mongoose = require('mongoose')

const seedDB = (userData, topicsData, articlesData, commentsData) => { 

  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        User.insertMany(userData),
        Topic.insertMany(topicsData)
     ])
    }) 
    .then(([userDocs, topicDocs]) => {
      return Promise.all([
       userDocs,
       topicDocs, 
       Article.insertMany(formatArticleData(articlesData, userDocs, topicDocs)),
      ])
     })
    .then(([userDocs, topicDocs, articleDocs]) => {
     return Promise.all ([
      userDocs,
       topicDocs, 
        articleDocs, 
         Comments.insertMany(formatCommentData(commentsData, userDocs, articleDocs))
       ])
     })       
};

module.exports = seedDB;


