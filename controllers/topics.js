const { Topic, Article, Comments } = require('../models')
const { getCommentCount } = require ('./comments.js')

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
  .populate('created_by', ['name', 'username', 'avatar_url'])
  .lean()
  .then(articles => Promise.all(articles.map(article => getCommentCount(article, Comments))))
  .then(articles => {
     if(articles.length === 0) throw { msg: 'Not Found', status: 404}
    res.status(200).send({ articles })
  })
  .catch(next)
}

const addArticleByTopicSlug = (req, res, next) => {
  req.body['belongs_to'] = req.params.topic_slug;
  Article.create(req.body)
  .then(article => {
    res.status(201).send(article)
  })
  .catch(next)
}

module.exports = { getTopics, getArticleByTopicSlug, addArticleByTopicSlug }