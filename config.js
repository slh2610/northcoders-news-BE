const NODE_ENV = process.env.NoDE_ENV || 'deveopment'

consfig = {
  development: 'mongodb:localhost etc.',
  test: 'same as above but with _test afterwards'
}

module.exports = conifg[NODE_ENV];