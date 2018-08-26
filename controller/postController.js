const postModel = require('../model/postModel');
const loginModel = require('../model/loginModel');

function PostModule(server){
  
    server.get('/', function(req, resp){
      
        var passDataLogin, passDataPost;
        
        postModel.allPosts(function(list){
            passDataPost = list;
        });
        
        loginModel.allUsers(function(list){
            passDataLogin = list;
            
            if(passDataLogin != undefined && passDataPost != undefined)
            resp.render('./pages/index', { postData: passDataPost, loginData: passDataLogin });
        });
        
    });
    
}

module.exports.Activate = PostModule;