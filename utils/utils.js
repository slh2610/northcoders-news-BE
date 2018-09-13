
const findTopicSlug = (info, topicDocs) => {
  for(let i = 0; i < topicDocs.length; i++) {
    if(info.topic === topicDocs[i].slug) {
      return topicDocs[i].slug
    }
  }
  return 'No topic slug found'
}

const findUserId = (info, userDocs) => {
  for(let i = 0; i < userDocs.length; i++) {
    if(info.created_by === userDocs[i].username) {
      return userDocs[i]._id
   }
 }
 return 'No user ID found'
}

const formatArticleData = ((articlesData, userDocs, topicDocs) => {
  return articlesData.map(info => {
    return {
      ...info,
      belongs_to: findTopicSlug(info, topicDocs),
      created_by: findUserId(info, userDocs)
     }
   })
  })
  

const findArticleId = (info, articleDocs) => {
  for(let i = 0; i < articleDocs.length; i++) {
    if(info.belongs_to === articleDocs[i].title) {
      return articleDocs[i]._id
    }
  }
  
}  

const formatCommentData = (commentsData, userDocs, articleDocs) => {
  return commentsData.map(info => (
    {
      ...info,
      belongs_to: findArticleId(info, articleDocs),
      created_by: findUserId(info, userDocs)    
    }
 ))
}  

module.exports = { formatCommentData, formatArticleData }



