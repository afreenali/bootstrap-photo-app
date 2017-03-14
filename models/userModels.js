var userModels = userModels;
module.exports = userModels;

function userModels(mongoose){
   
var userSchema = mongoose.Schema({

        firstname: {type:String, required:true},
        lastname: { type: String, required: true },
        email : { type: String, required: true },
        password: { type: String, required: true },
        // enum is used to accept only listed strings//
        createddate: {type:Date, default:Date.now}
},{collection:'user'});

//create models for user//
var userModel = mongoose.model('userModel',  userSchema);

return userModel;
}