postArticle = postArticle;
module.exports = postArticle;

function postArticle( app, express, articleModel, mongoose){
    
    var api = express.Router();

    api.post("/article",createpost);
    //posting article in the database//
        function createpost(req, res){
            var article = req.body;
            if (article.body.length <= 120){
            article.bodyshort = article.body;
        } else{
            article.bodyshort = article.body.substring(0, 120);
        }
        

        articleModel.create(article, function (err, small) {
            if (err) return handleError(err);
            res.json({message:"data posted!"});
        })
        
        }

        return api;

}