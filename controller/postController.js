const postModel = require('../model/postModel');
const loginModel = require('../model/loginModel');
const commentModel = require('../model/commentModel');

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
    
    server.post('/create-post', function(req, resp){

        var passDataLogin, passDataPost;

        loginModel.allUsers(function(list){
            passDataLogin = list;
        });
        
        postModel.allPosts(function(list){
            passDataPost = list;
            
            resp.render('./pages/index', { postData: passDataPost, loginData: passDataLogin });
        });
        
        postModel.addPost('AlexRotorReyes', req.body.title, req.body.desc, req.body.content, 0, function(){
            console.log("saved post to database!");
        });
        
    });
    
    server.get('/post', function(req, resp){
      
        var passDataLogin, passDataComment, passDataPost;

        loginModel.allUsers(function(list){
            passDataLogin = list;
        });

        if(req.query.comment != null || req.query.comment != undefined || req.query.comment == ''){
            
            commentModel.addComment('AlexRotorReyes', req.query.comment, req.query.title, function(){
                console.log("saved comment to database!");
            });
            
        }

        commentModel.allComments(function(list){
            passDataComment = list;
        });
        
        postModel.findPost(req.query.title, function(post){
            passDataPost = post;
            
            resp.render('./pages/post', { data: passDataPost, commentData: passDataComment, loginData: passDataLogin });
        });    
    
    });
    
    server.get('/profile', function(req, resp){
    
        var passDataComment, passDataPost, passDataLogin;

        postModel.allPosts(function(list){
            passDataPost = list;
        });

        commentModel.allComments(function(list){
            passDataComment = list;
        });
        
        loginModel.findUser(req.query.user, function(user){
            passDataLogin = user;
            
            resp.render('./pages/profile', { data: passDataLogin, commentData: passDataComment, postData: passDataPost });
        });
        
    });
    
    server.get('/findPost', function(req,resp){
       var passDataPost
       
       postModel.findPost(req.query.title, function(post){
           passDataPost = post;
           
           resp.redirect('./profile', {postData: passDataPost});
       });
       
    });
    
    server.get('/deletePost', function(req, resp){
        var dataID = req.query._id;
        var postData;
        console.log(dataID + " <--- ID of the Post");
        
        postModel.findPost(req.query.title, function(data){
            postData = { data:data };
            console.log(postData + " <--- Post Data");
            
            for(var i = 0; i < postData.data.length; i++){
                
                if(postData.data[i]._id == dataID){
                   postModel.deletePost(dataID);
                }
            }
            
            resp.redirect('./profile');
        });
    });
    
}

module.exports.Activate = PostModule;