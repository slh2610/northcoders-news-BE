const { User } = require('../models')

const getUsers = (req, res, next) => {
  User.find()
  .then(user => {
    res.status(200).send({user})
  })
  .catch(next)
}

const getUsername = (req, res, next) => {
  const users = req.params.username
  User.find({username: users})
  .then(user => {
    if(user.length === 0) throw { msg: 'Not Found', status: 404}
    res.status(200).send({user})
  })
  .catch(next)
}

module.exports = { getUsers, getUsername }