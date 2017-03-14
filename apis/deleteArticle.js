deleteArticle = deleteArticle;
module.exports = deleteArticle;

function deleteArticle( app, express, articleModel, mongoose){

    
    var api = express.Router();

   
//deleting the post//
    api.delete("/:id", deleteArticle);


                function deleteArticle (req,res){
                    var articleId = req.params.id;
                    console.log(articleId);
                    //params is used to read the articles//
                articleModel.find({ _id:articleId }).remove(function(){
                        res.json({message : "deleted"})
                });
                }

return api
}