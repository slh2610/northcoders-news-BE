const router = require('express').Router();
const {getTopics, getArticleByTopicSlug, addArticleByTopicSlug, getArticles, getArticleId, getCommentsByArticleId, getUsers, getUsername, addCommentsByArticleId, changeVotes, getComments, getCommentById, updateCommentVotes, deleteComments} = require('../controllers/index.js')

router.route('/topics')
.get(getTopics)

router.route('/topics/:topic_slug/articles')
.get(getArticleByTopicSlug)
.post(addArticleByTopicSlug)

router.route('/articles')
.get(getArticles)

router.route('/articles/:article_id')
.get(getArticleId)
.patch(changeVotes)

router.route('/articles/:article_id/comments')
.get(getCommentsByArticleId)
.post(addCommentsByArticleId)

router.route('/comments')
.get(getComments)

router.route('/comments/:comment_id')
.get(getCommentById)
.patch(updateCommentVotes)
.delete(deleteComments)

router.route('/users')
.get(getUsers)

router.route('/users/:username')
.get(getUsername)

module.exports = router