const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  development: 'mongodb://localhost:27017/nc_news',
  test: 'mongodb://localhost:27017/nc_news_test_file',  
}

module.exports = config[NODE_ENV];