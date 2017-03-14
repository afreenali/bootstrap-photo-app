var commentModels = commentModels;
module.exports = commentModels;

function commentModels (mongoose){
     //create schema for comments//
    var commentSchema = mongoose.Schema({
    articleid : {type:String, required:true},
    dateAdded : {type:Date, default:Date.now},
    commentbody : String,
    author : {type:String,required:true},
    email : String
},{collection:'comments'});

//create models for comments//
var commentModel = mongoose.model('commentModel', commentSchema);

return commentModel;
}