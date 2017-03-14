var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//connect to the mongo db//
mongoose.connect('mongodb://ali050786:bb698bb698@ds145039.mlab.com:45039/mean-blog');

var articleModel = require("./models/articleModels.js")(mongoose);
var commentModel = require("./models/commentModels.js")(mongoose);
var userModel = require("./models/userModels.js")(mongoose);

//API to get All Article from the Database//
var getArticles = require("./apis/getArticles.js")(app, express,articleModel,mongoose);
//API to post new Article to the Database//
var postArticle = require("./apis/postArticle.js")(app, express,articleModel,mongoose);
//API to Edit the Article in the Database//
var editArticle = require("./apis/editArticle.js")(app, express,articleModel,mongoose);
//API to Delete the Article from the Database//
var deleteArticle = require("./apis/deleteArticle.js")(app, express,articleModel,mongoose);
//API to get single Article from the Database//
var createuser = require("./apis/createUser.js")(app, express,userModel,mongoose);

//var getSingleArticle = require("./apis/getSingleArticle.js")(app, express,articleModel,mongoose);


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/api',getArticles);
app.use('/api',postArticle);
app.use('/api',createuser);
app.use('/api/article',editArticle);
app.use('/api/article',deleteArticle);
//app.use('/api/single',getSingleArticle);

// GET /static/style.css etc.
app.use('/', express.static(__dirname + '/public'));


//Server created here//
app.listen(3000, function(){
    console.log("listening to the server");
});




//posting article in the database//
//app.post("/api/article",createpost);
//posting a comment in the database//
app.post("/api/comment",createcomment);
//getting comment related to the article//
app.get("/api/comments/:id",getrelcomments);

//delete article from the database;
//app.get("/api/article/:id",getonepost);
//getonepost article from the database;





function getrelcomments(req,res){
    var id = req.params.id;
    console.log(id);
    commentModel.find({ articleid: id },function(err,docs){
        res.json(docs);
    })
}


function createcomment(req,res){
    var comment = req.body;
    commentModel.create(comment).then(function(postObj){
        res.json(200);
    },function(err){
        res.json(404);
    })
}


