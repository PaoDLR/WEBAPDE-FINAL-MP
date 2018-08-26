const postModel = require('../model/postModel');
const loginModel = require('../model/loginModel');

function PostModule(server){
  
    server.get('/', function(req, resp){
      
        var passDataLogin, passDataPost;
        
        postModel.allPosts(function(list){
            console.log(list + "Post data-----------------------------------");
            passDataPost = list;
            console.log(passDataPost + "here here here here");
        });
        
        loginModel.allUsers(function(list){
            console.log(list + "user data----------------------------------------");
            passDataLogin = list;
            
            if(passDataLogin != undefined && passDataPost != undefined)
            resp.render('./pages/index', { postData: passDataPost, loginData: passDataLogin });
        });
        
    });
    
}

module.exports.Activate = PostModule;