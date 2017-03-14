(function() {

angular.module("blog", ['ngRoute']).controller("blogctrledit", ['$scope', '$http', '$route', '$routeParams', '$location', blogctrledit])
                                   .controller("blogctrl", ['$scope', '$http','$location', blogctrl])
                                   .controller("articleView",['$scope','$http','$route','$routeParams','$location',articleView])
                                   .controller("signupctrl",['$scope','$http','$route', signupctrl])
                                   .config(blogconfig);
                                

   
function blogconfig($routeProvider) {
        $routeProvider.when("/newArticle", {
            templateUrl: "form.html",
            controller: "blogctrl"
        }).when("/editArticle/:id", {
            templateUrl: "form.html",
            controller: "blogctrledit"
        }).when("/home", {
            templateUrl: "home.html",
            controller: "blogctrl"
        }).when("/article/:id", {
            templateUrl: "articleview.html",
            controller: "articleView"
        }).when("/login", {
            templateUrl: "login.html",
            controller: "login"
        }).when("/signup", {
            templateUrl: "signup.html",
            controller: "signupctrl"
        }).otherwise({
            redirectTo: "/home"
        })
    }

// Controller for Blog Edit//
function blogctrledit($scope, $http, $route, $routeParams, $location) {
        // sc means $scope hereAfter//
        var sc = $scope;
      	sc.confirm = false;
        sc.dialogtxt = "Are you sure you want to Update this Article"
        sc.submittxt = "Update Article"
        var id = $route.current.params.id;
        console.log(id);
      
		// sc.go is used to re route to the home page//
        sc.go = function(path) {

            $location.path(path);
        };
		
        
		// getting request from the server for the single post//
        $http.get("/api/article/" + id, id).then(function(article) {
            sc.article = article.data;
            console.log(sc.article);

        }, function(err) {
            console.log(err)
        });
		
      
      	
        sc.formsubmit = askConfirmation;
        sc.userConfirmed = updateArticle;


      	//updating the current Article//
        function updateArticle() {
            console.log(sc.article);
            $http.put("/api/article/" + sc.article._id, sc.article).then(function(res) {
                sc.message = res.message; 
                console.log(sc.message);
                sc.confirm = false;
                sc.go("/home");


            })
        }

      	// Asking for confirmation//
        function askConfirmation() {
            sc.confirm = true;
        }

    }

//Controller for Blog view Create and Delete//
function blogctrl($scope, $http, $location) {
   		// sc means $scope hereAfter//
        var sc = $scope;

		// other $scopes are defined here//
        sc.submittxt = "Create Article";
        sc.dialogtxt = "Do you really want to create this Article"
        sc.confirm = false;
        sc.article = "";
		
  		// Form Clear
        function clearform() {
            sc.article = {
                'title': "",
                'body': "",
                'tag': 'buttons'
            }
        }
		// sc.go is used to re route to the home page//
        sc.go = function(path) {

            $location.path(path);
        };
		
        
        // initialize below function while routed 
        function init() {
            getallarticle();
            clearform();
        }

        init();
		// Ask confirmation
        function askConfirmation() {
            sc.confirm = true;
        }


		//
        sc.formsubmit = askConfirmation;
        sc.userConfirmed = createpost;
        sc.deleteArticle = deleteArticle;
        // sc.editArticle = editArticle;



		// create a Article //
        function createpost() {
            //here article is an OBJECT(not array) generated from the HTML form
            var article = sc.article;
            $http.post("/api/article", article).then(function() {
                clearform();
                sc.go("/home")
                sc.confirm = false;
            });

        }

        //getting all post from the server//
        function getallarticle() {
            $http.get("/api/article").then(function(articles) {
                    sc.articles = articles.data;
                    console.log(sc.articles)
                },
                function(err) {
                    console.log(err);
                }
            )
        }
  
  
		// deleting current article//
        function deleteArticle(articleId) {
            $http.delete("/api/article/" + articleId).then(function() {
                getallarticle();
            });
        }



    }


function articleView($scope, $http, $route, $routeParam, $location) {
       var sc = $scope;
       var articleid = $route.current.params.id; 
        console.log(articleid);
        sc.article;
        //getting all the comments//
        getallcomments();
        clearform();

        //getting current article 
        $http.get("/api/article/"+articleid, articleid).then(function(res){
            sc.article = res.data
        })

        function clearform(){
            sc.comment = {
                'articleid' : articleid,
                'commentbody': "",
                'author' : "",
                'email' : ""
            }
        }
        

        sc.postComment = postComment;
        

        function postComment(comment){
            sc.comment = comment;
            $http.post("/api/comment",sc.comment).then(function(res){
                console.log(res);
               getallcomments();
               clearform();
            },function(err){
                console.log(err);
            })
        };

        function getallcomments(){
            $http.get("api/comments/"+articleid,articleid).then(function(res){
                sc.comments = res.data;
                console.log(sc.comments);
            }, function(err){
                console.log(err.data);
            }
            )
        }
    }




    function signupctrl($scope,$http,$route){
        sc = $scope;

        sc.createuser = createuser;

        function createuser(user){
        $http.post("api/user", user).then(function(res){
            console.log(res);
        })
        }
        
    }

})(); //immidiate invoking fn//