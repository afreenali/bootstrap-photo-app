editArticle = editArticle;
module.exports = editArticle;

function editArticle( app, express, articleModel, mongoose){
    
    var api = express.Router();

   //update article from the database;
    api.put("/:id", updateArticle);


                        function updateArticle (req, res){
                            var articleId = req.params.id;
                            var article = req.body;
                             if (article.body.length <= 120){
                                article.bodyshort = article.body;
                                   } else{
                                article.bodyshort = article.body.substring(0, 120);
                                 }
                            console.log(article);
                         var query = {_id:articleId};
                         articleModel.update(query,{
                             title : article.title,
                             bodyshort : article.bodyshort,
                             body:  article.body,
                             tag : article.tag
                         },function(){
                            res.json({message:"updated sucessfully"})
                         })
                         }
                        return api;
                    

                        }