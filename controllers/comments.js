const { Comments } = require('../models')

const getComments = (req, res, next) => {
  Comments.find()
  .populate('created_by', ['name', 'username', 'avatar_url'])
  .populate('belongs_to', ['title', 'body', 'votes'])
  .then(comments => {
    res.status(200).send({ comments })
 })
 .catch(next)
}

const getCommentById = (req, res, next) => {
  const commentId = req.params.comment_id
  Comments.findById(commentId)
  .then(comments => {
    res.status(200).send({ comments })
  })
  .catch(next)
}

const updateCommentVotes = (req, res, next) => {
  const commentId = req.params.comment_id
  if(req.query.vote === 'up') {
  Comments.findByIdAndUpdate(commentId, { $inc: { votes: 1}, new: true })
  .then(changeVotes => {
    res.status(200).send(changeVotes)
  })
  .catch(next)
  } else if (req.query.vote === 'down') {
  Comments.findByIdAndUpdate(commentId, { $inc: { votes: -1}, new: true})
  .then(changeVotes => {
    res.status(200).send(changeVotes)
  })
  .catch(next)
 }
}

const deleteComments = (req, res, next) => {
 const commentId = req.params.comment_id
  Comments.findByIdAndRemove(commentId)
  .then(comment => {
    if(!comment) throw { msg: 'Not Found', status: 404}
     res.status(200).send(comment)
  })
  .catch(next)
}

const getCommentCount = (article, Comments) => {
  return Comments.countDocuments({ belongs_to: article._id })
    .then(commentCount => {
      article.comment_count = commentCount;
      return article;
  })
};

module.exports = {getComments, getCommentById, updateCommentVotes, deleteComments, getCommentCount}