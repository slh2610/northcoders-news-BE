const { Topic, Article } = require('../models')

const getTopics = (req, res, next) => {
  Topic.find()
  .then(topics => {
    res.status(200).send({ topics })
  })
  .catch(next)
}

const getArticleByTopicSlug = (req, res, next) => {
  const topicSlug = req.params.topic_slug;
  Article.find({ belongs_to : topicSlug})
  .then(article => {
    console.log(article.length)
     if(article.length === 0) throw { msg: 'Not Found', status: 404}
    res.status(200).send({ article })
  })
  .catch(next)
}

const addArticleByTopicSlug = (req, res, next) => {
  req.body['belongs_to'] = req.params.topic_slug;
  Article.create(req.body)
  .then(article => {
    res.status(201).send( article )
  })
  .catch(next)
}

module.exports = { getTopics, getArticleByTopicSlug, addArticleByTopicSlug }