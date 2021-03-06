exports.handle404s = (err, req, res, next) => {
  if (err.msg === 'Not Found') {
    res.status(404).send({ msg: 'Not Found' })
  }
  else next(err);
}

exports.handle400s = (err, req, res, next) => { 
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ msg: err.message || 'Bad Request' })
  }
  else next(err)
}

exports.handle500s = (err, req, res) => {
  res.status(500).send('Internal server error');
}