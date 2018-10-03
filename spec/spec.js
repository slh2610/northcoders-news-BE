process.env.NODE_ENV = 'test';
const {userData, topicsData, articlesData, commentsData} = require('../seed/testData/index.js');
const seedDB = require ('../seed/seed');
const { expect } = require ('chai');
const app = require('../app.js');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe('/api', () => {
  let users, topics, articles, comments;
  
  beforeEach(function () {
    return seedDB(userData, topicsData, articlesData, commentsData)
      .then((docs) => {
        [users, topics, articles, comments] = docs
    })
  });
  after(() => mongoose.disconnect())

  describe('/topics', () => {
    it('GET returns an array of topics and 200 status code', () => {
      return request.get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.have.length(topics.length)
      })
    }) 
   it('GET returns an article related to a topics slug and a 200 status code', () => {
    return request.get(`/api/topics/${topics[0].slug}/articles`)
      .expect(200)
      .then(res => {
        expect(res.body.articles[0].belongs_to).to.equal(topics[0].slug)   
       })
      }) 
    it('/:topic_slug/articles - GET an invalid topic_slug returns error message and 404 status code', () => {
      return request.get(`/api/topics/12344/articles`)
        .expect(404)
         .then(res => {
          expect(res.body.msg).to.equal('Not Found')
        })
      });  
    it('POST adds a new article which belongs to a a topic slug and gives a 201 status code', () => {
      return request
       .post(`/api/topics/${topics[1].slug}/articles`)
        .send({ "title": "new article", "body": "This is my new article content", "created_by": "5b9ab6c19f86e16cdcf7636a"})
         .expect(201)
          .then(res => {
           expect(res.body.belongs_to).to.equal(topics[1].slug)
            expect(res.body.title).to.equal('new article')
             expect(res.body.body).to.equal('This is my new article content')
           })
         })
     it('/:topic_slug/articles - POST an article without required fields returns an error message and status 400', () => {
       return request
        .post(`/api/topics/${topics[1].slug}/articles`)
         .send({ "body": "This is my new article content", "created_by": "5b9ab6c19f86e16cdcf7636a" })
          .expect(400)
           .then(res => {
            expect(res.body.msg).to.equal('articles validation failed: title: Path `title` is required.')
          })
       })
    })
  describe('/articles', () => {
    it('GET returns all articles and a 200 status code', () => {
      return request.get('/api/articles')
      .expect(200)
       .then(res => {
        expect(res.body.articles).to.have.length(articles.length)
      })
    })
    it('GET /api/articles/:article_id returns all articles with a given ID and a 200 status code', () => {
      return request.get(`/api/articles/${articles[0]._id}`)
      .expect(200)
       .then(res => {
        expect(res.body.article.title).to.equal(articles[0].title)
         expect(res.body.article.body).to.equal(articles[0].body)
          expect(res.body.article.belongs_to).to.equal(articles[0].belongs_to)
        })
      })
    it('GET /api/articles/:article_id - Gets an article that does not exist returns error message and 404 status code', () => {
      return request.get(`/api/articles/${mongoose.Types.ObjectId()}`)
        .expect(404)
         .then(res => {   
          expect(res.body.msg).to.equal('Not Found')
        })
      });
    it('/articles/:article_id - An invalid path and returns error message and 400 status code', () => {
      return request.get(`/api/articles/notanid`)
        .expect(400)
         .then(res => {
          expect(res.body.msg).to.equal('Cast to ObjectId failed for value "notanid" at path "_id" for model "articles"')
        })
      }); 
    it('GET /articles/:article_id/comments returns all comments for a given article and a 200 status code', () => {
      return request.get(`/api/articles/${articles[0]._id}/comments`)
       .expect(200)
        .then(res => {
         expect(res.body.comment).to.have.length(2)
      })
    }); 
    it('GET /articles/:article_id/comments - Gets a comment for an ID that does not exist and a 404 status code', () => {
      return request.get(`/api/articles/${mongoose.Types.ObjectId()}/comments`)
       .expect(404)
        .then(res => {   
         expect(res.body.msg).to.equal('Not Found')
       })
    });
    it('GET /articles/:article_id/comments - Gets a comment for a bad ID path and a 400 status code', () => {
      return request.get(`/api/articles/kndsknsd`)
       .expect(400)
        .then(res => { 
         expect(res.body.msg).to.equal('Cast to ObjectId failed for value "kndsknsd" at path "_id" for model "articles"')
       })
     });
    it('POST /api/articles/:article_id/comments adds a new comment for a given article and a 201 status code', () => {
      return request
       .post(`/api/articles/${articles[0]._id}/comments`)
        .send({"body": "This is a new comment for this article", "created_by": "5b9b87ceed324f1a4ce8eb06"})
         .expect(201)
          .then(res => {
           expect(res.body.comment.created_by).to.equal("5b9b87ceed324f1a4ce8eb06")
            expect(res.body.comment.body).to.equal("This is a new comment for this article")
          })
        })
    it('/articles/:article_id/comments - POST a comment without required fields returns an error message and status 400', () => {
      return request
       .post(`/api/articles/${articles[1]._id}/comments`)
        .send({ "created_by": "5b9b87ceed324f1a4ce8eb06" })
         .expect(400)
          .then(res => {
           expect(res.body.msg).to.equal('comments validation failed: body: Path `body` is required.')
         })
       })
     })
  describe('/articles/:article_id', () => { 
    it('PATCH /api/articles/:article_id changes the vote count by one and sends a 200 status code', () => {
      return request
      .patch(`/api/articles/${articles[0]._id}?vote=up`)
       .expect(200)
       .then(res => {
        expect(res.body.updateVote.votes).to.equal(0)
         return request
         .get(`/api/articles/${articles[0]._id}`)
          .expect(200)
           .then(res => {
            expect(res.body.article.votes).to.equal(1)  
          })
         })
       })
    it('/api/articles/:article_id - PATCH returns an error and 404 status when given an incorrect query', () => {
      return request
       .patch(`/api/articles/${articles[0]._id}?vote=hello`)
        .expect(404)
         .then(res => {
           expect(res.body.msg).to.equal('Not Found')
         })
       })   
     })  
  describe('/comments', () => {
    it('PATCH /api/comments/:comment_id changes the vote count by one and sends a 200 status code', () => {
      return request
      .patch(`/api/comments/${comments[0]._id}?vote=up`)
       .expect(200)
        .then(res => {
         expect(res.body.votes).to.equal(7)
          return request
          .get(`/api/comments/${comments[0]._id}`)
           .expect(200)
            .then(res => {
             expect(res.body.comments.votes).to.equal(8) 
          });        
        });
      }); 
    it('/api/comments/:comment_id - PATCH returns an error and 404 status when given an incorrect query', () => {
      return request
        .patch(`/api/articles/${comments[0]._id}?vote=sdkfjs`)
          .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal('Not Found')
             })
           })    
    it('DELETE /api/comments/:comment_id deletes a comments by commentID and sends a 200 status code', () => {
      return request
      .delete(`/api/comments/${comments[1]._id}`)
       .expect(200)
        .then(res => {
         expect(res.body.body).to.equal(`${comments[1].body}`)
          return request
           .get(`/api/comments/${comments[1]._id}`)
            .expect(200)
             .then(res => { 
              expect(res.body.comments).to.equal(null)  
            }) 
          })
        })  
      it('/api/comments/:comment_id - DELETE returns error msg and 404 status when trying to delete with an ID that does not exist', () =>{
        return request
         .delete(`/api/comments/${mongoose.Types.ObjectId()}`)
          .expect(404)
           .then(res => {
             expect(res.body.msg).to.equal('Not Found')
           })
         }) 
      it('/api/comments/:comment_id - DELETE returns error msg and 400 status when trying to delete using a bad path', () =>{
        return request
         .delete(`/api/comments/slkfsgs`)
          .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal('Cast to ObjectId failed for value "slkfsgs" at path "_id" for model "comments"')
             })
          })   
       });  
  describe('/users', () => {
    it('GET /users/:username returns users by username and a status 200', () => {
     return request 
      .get(`/api/users/${users[0].username}`)  
       .expect(200)
        .then(res => {
         expect(res.body.user[0].username).to.equal(users[0].username)
       })
     })
     it('/users/:username - GET returns an error and status 404 when given an incorrect username', () => {
      return request 
       .get(`/api/users/skgslfksd`)  
        .expect(404)
         .then(res => {
          expect(res.body.msg).to.equal('Not Found')
        })
      }) 
   })
});