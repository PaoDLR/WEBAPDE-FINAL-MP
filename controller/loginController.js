const loginModel = require('../model/loginModel');
const postModel = require('../model/postModel');

function LoginModule(server){

    //Leads you to the sign-in page
    server.get('/signin', function(req, resp){
       resp.render('./pages/signin');
    });

    //Creating an account
     server.post('/signup', function(req, resp){    
         
       loginModel.addLogin(req.body.user, req.body.pass, req.body.desc, function(){
          var passDataLogin, passDataPost;

                loginModel.allUsers(function(list){
                    passDataLogin = list;
                });

                postModel.allPosts(function(list){
                    passDataPost = list;
                    resp.render('./pages/index', { postData: passDataPost, loginData: passDataLogin });
                });
       });
    });

    //Logging in to an account
    server.post('/login', function(req, resp){
        
        loginModel.checkLogin(req.body.user, req.body.pass, function(result){
          
          if(result){
              
              var passDataLogin, passDataPost;

                loginModel.allUsers(function(list){
                    passDataLogin = list;
                });

                postModel.allPosts(function(list){
                    passDataPost = list;
                    resp.render('./pages/index', { postData: passDataPost, loginData: passDataLogin });
                });
          }
          else{
              //This should go back to sign-in cause user failed to login successfully.
              resp.redirect('./signin');
          }
      });

    });

}

module.exports.Activate = LoginModule;