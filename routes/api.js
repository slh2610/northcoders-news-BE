const router = require('express').Router();
const {getTopics, getArticleByTopicSlug, addArticleByTopicSlug} = require('../controllers/topics.js')
const {getArticles, getArticleId, getCommentsByArticleId, addCommentsByArticleId, changeVotes, } = require('../controllers/articles.js')
const {getComments, getCommentById, updateCommentVotes, deleteComments} = require('../controllers/comments.js')
const {getUsers, getUsername} = require('../controllers/users.js')
 
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
,
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