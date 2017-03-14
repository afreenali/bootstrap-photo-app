createUser = createUser;
module.exports = createUser;

function createUser( app, express, userModel, mongoose){
    
    var api = express.Router();

    api.post("/user",createuser);
    //posting article in the database//
        function createuser(req, res){
            var user = req.body;
         
        

        userModel.create(user, function (err, docs) {
            if (err) return handleError(err);
            res.json({message:"data posted!"});
        });
        }
        return api;
}