var articleModels = articleModels;
module.exports = articleModels;

function articleModels(mongoose){
   
var articleSchema = mongoose.Schema({

        title: {type:String, required:true},
        body: String,
        bodyshort : String,
        tag: {type:String, enum:['buttons', 'menus']},
        // enum is used to accept only listed strings//
        posted: {type:Date, default:Date.now}
},{collection:'article'});

//create models for article//
var articleModel = mongoose.model('articleModel',  articleSchema);

return articleModel;
}