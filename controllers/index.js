const { User, Topic, Article, Comments } = require('../models')

const getTopics = (req, res, next) => {
  Topic.find()
  .then(topics => {
    res.status(200).send({ topics })
})
}

const getArticleByTopicSlug = (req, res, next) => {
  const topicSlug = req.params.topic_slug;
  Article.find({ belongs_to : topicSlug})
  .then(slug => {
    res.send({slug})
  })
}

const addArticleByTopicSlug = (req, res, next) => {
  req.body['belongs_to'] = req.params.topic_slug;
  Article.create(req.body)
  .then(article => {
    res.status(201).send(article)
  })
}

const getArticles = (req, res, next) => {
  Article.find()
  .then(articles => {
    res.status(200).send({ articles })
  })
}

const getArticleId = (req, res, next) => {
  const articleId = req.params.article_id
  Article.findById(articleId)
  .then(articleId => {
    res.status(200).send({articleId})
  })
}

const changeVotes = (req, res, next) => {
  const articleId = req.params.article_id
  if(req.query.vote === 'up') {
  Article.findByIdAndUpdate(articleId, {votes: +1})
  .then(updateVote => {
    res.status(201).send({updateVote})
  })
 } else if(req.query.vote === 'down') {
  Article.findByIdAndUpdate(articleId, {votes: -1})
  .then(updateVote => {
    res.status(201).send({updateVote})
  })
 }
}

const getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id
  Comments.find({belongs_to: articleId})
  .then(comment => {
    res.status(200).send({comment})
  })
}

const addCommentsByArticleId = (req, res, next) => {
req.body['belongs_to'] = req.params.article_id
Comments.create(req.body)
.then(comment => {
  res.status(201).send({comment})
})
}

const getComments = (req, res, next) => {
  Comments.find()
  .then(comments => {
    res.status(200).send({ comments })
 })
}

const getCommentById = (req, res, next) => {
  const commentId = req.params.comment_id
  Comments.findById(commentId)
  .then(comments => {
    res.status(200).send({ comments })
  })
}

const updateCommentVotes = (req, res, next) => {
  const commentId = req.params.comment_id
  if(req.query.votes === 'up') {
  Comments.findByIdAndUpdate(commentId, {votes: +1})
  .then(changeVotes => {
    res.status(204).send(changeVotes)
  })
  } else if (req.query.votes === 'down') {
  Comments.findByIdAndUpdate(commentId, {votes: -1})
  .then(changeVotes => {
    res.status(204).send(changeVotes)
  })
}
}

const deleteComments = (req, res, next) => {
 const commentId = req.params.comment_id
  Comments.findByIdAndRemove(commentId)
  .then(comment => {
    res.status(200).send(comment)
  })
}

const getUsers = (req, res, next) => {
  User.find()
  .then(user => {
    res.status(200).send({user})
  })
}

const getUsername = (req, res, next) => {
  const users = req.params.username
  User.find({username: users})
  .then(user => {
    res.status(200).send({user})
  })
}

module.exports = { getTopics, getArticleByTopicSlug, addArticleByTopicSlug, getArticles, getArticleId, getCommentsByArticleId, getUsers, getUsername, addCommentsByArticleId, changeVotes, getComments, getCommentById, updateCommentVotes, deleteComments}

