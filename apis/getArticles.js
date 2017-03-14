getArticle = getArticle;
module.exports = getArticle;


function getArticle(app, express,articleModel,mongoose){


  var api = express.Router();

  api.get("/article",getallpost);

            function getallpost(req,res){

            articleModel.find({}, function (err, docs) {
            if (err){ res.json({message : "could not get data"})}
            var articles = docs;
            res.json(docs);
                });
              }
              
  api.get("/article/:id",getSinglePost);


            function getSinglePost(req,res){
                    var id = req.params.id;
                    articleModel.findById(id, function (err, doc){
                    res.json(doc);
                        });
                        }

 return api

}