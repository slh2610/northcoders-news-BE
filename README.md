# Northcoders News

Northcoders News is an API containing articles, article comments, user data and topics.

### Prerequisites

Northcoders News uses the following dev dependencies:

chai
mocha
nodemon
supertest

As well as the following dependencies:

body-parser
express
mongoose

run "npm install" to install all dependencies.

### Database

The database has been created using MongoDB. To seed the database use the command 'node seed/seed.dev.js'

### End Points

Various end points can be accessed by running 'npm run dev' in the terminal which will then connect to Port 9090. In your browse type 'localhost:9090'
followed by the following end points:

GET /api

GET /api/topics

GET /api/topics/:topic_slug/articles

POST /api/topics/:topic_slug/articles

GET /api/articles

GET /api/articles/:article_id

GET /api/articles/:article_id/comments

POST /api/articles/:article_id/comments

PATCH /api/articles/:article_id?vote=up (to increment votes by one)
/api/articles/:article_id?vote=down (to decrease votes by one)

PATCH /api/comments/:comment_id?vote=up (to increment votes by one)
/api/comments/:comment_id?vote=down (to decrease votes by one)

DELETE /api/comments/:comment_id

GET /api/users/:username

## Running the tests

By typing 'npm test' into the terminal, you will be able to access the test data and will run the tests.
Tests have been created for error handling and for testing end points.
