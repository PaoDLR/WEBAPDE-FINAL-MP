const postModel = require('../model/postModel');
const loginModel = require('../model/loginModel');

function PostModule(server){
  
    server.get('/', function(req, resp){
      
        var passDataLogin;

        loginModel.find({}, function(err, login){
           passDataLogin = login; 
        });
        
        passDataLogin = postModel.allPosts();

        postModel.find({}, function(err, post){
           resp.render('./pages/index', { postData: post, loginData: passDataLogin });
        });

    });
    
}

module.exports.Activate = PostModule;