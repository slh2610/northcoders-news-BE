const { Article, Comments, } = require('../models')
const { getCommentCount } = require ('./comments.js')

const getArticles = (req, res, next) => {
  Article.find({}, '-__v')
  .populate('created_by', ['name', 'username', 'avatar_url'])
  .lean()
  .then(articles => Promise.all(articles.map(article => getCommentCount(article, Comments))))
  .then(articles => res.status(200).send({ articles }))
  .catch(next)
};

const getArticleId = (req, res, next) => {
  const articleId = req.params.article_id
  Article.findById(articleId)
  .populate('created_by', ['name', 'username', 'avatar_url'])
  .lean()
  .then(article => (getCommentCount(article, Comments)))
  .then(article => {
    res.status(200).send({ article })
  })
  .catch(next)
}

const changeVotes = (req, res, next) => {
  const articleId = req.params.article_id
  if(req.query.vote === 'up') {
  Article.findByIdAndUpdate(articleId, {$inc: {votes: 1}, new: true})  
  .populate('created_by', ['name', 'username', 'avatar_url'])
  .then(updateVote => {
    res.status(200).send({updateVote})
  })
  .catch(next)
 } else if(req.query.vote === 'down') {
  Article.findByIdAndUpdate(articleId, {$inc: {votes: -1}, new: true})
  .populate('created_by', ['name', 'username', 'avatar_url'])
  .then(updateVote => {
    res.status(200).send({updateVote})
  })
  .catch(next)
 } else {
   res.status(404).send({ msg: 'Not Found', status: 404 })
 }
}

const getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id
  Comments.find({belongs_to: articleId})
  .populate('belongs_to', ['title', 'body', 'votes', 'created_by'])
   .then(comment => {
    if(comment.length === 0) throw { msg: 'Not Found', status: 404 }
    res.status(200).send({comment})
  })
  .catch(next)
}

const addCommentsByArticleId = (req, res, next) => {
req.body['belongs_to'] = req.params.article_id
Comments.create(req.body)
.then(comment => {
  res.status(201).send({comment})
})
.catch(next)
}




module.exports = { getArticles, getArticleId, getCommentsByArticleId, addCommentsByArticleId, changeVotes }

