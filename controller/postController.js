const postModel = require('../model/postModel');
const loginModel = require('../model/loginModel');
const commentModel = require('../model/commentModel');

function PostModule(server){
  
    server.get('/', function(req, resp){
      
        var passDataLogin, passDataPost;
        
        console.log(req.session.user +"this is the session.user in post----------------------------");
        
        postModel.allPosts(function(list){
            passDataPost = list;
        });
        
        loginModel.allUsers(function(list){
            passDataLogin = list;
            
            if(passDataLogin != undefined && passDataPost != undefined)
            resp.render('./pages/index', { postData: passDataPost, loginData: passDataLogin, loggedIn: req.session.user });
        });
        
    });
    
    server.post('/create-post', function(req, resp){

        var passDataLogin, passDataPost;

        loginModel.allUsers(function(list){
            passDataLogin = list;
        });
        
        postModel.allPosts(function(list){
            passDataPost = list;
            
            resp.render('./pages/index', { postData: passDataPost, loginData: passDataLogin, loggedIn: req.session.user });
        });
        
        postModel.addPost(req.session.user, req.body.title, req.body.desc, req.body.content, 0, function(){
            console.log("saved post to database!");
        });
        
    });
    
    server.get('/post', function(req, resp){
      
        var passDataLogin, passDataComment, passDataPost;

        loginModel.allUsers(function(list){
            passDataLogin = list;
        });

        if(req.query.comment != null || req.query.comment != undefined || req.query.comment == ''){
            
            commentModel.addComment(req.session.user, req.query.comment, req.query.title, function(){
                console.log("saved comment to database!");
            });
            
        }

        commentModel.allComments(function(list){
            passDataComment = list;
        });
        
        postModel.findPost(req.query.title, function(post){
            passDataPost = post;
            
            resp.render('./pages/post', { data: passDataPost, commentData: passDataComment, loginData: passDataLogin, loggedIn: req.session.user });
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
            
            resp.render('./pages/profile', { data: passDataLogin, commentData: passDataComment, postData: passDataPost, loggedIn: req.session.user });
        });
        
    });
    
    server.get('/findPost', function(req,resp){
        
       var passDataPost, passDataComment, passDataLogin;
       
        loginModel.findUser(req.query.user, function(user){
            passDataLogin = user;
        });
        
       commentModel.allComments(function(list){
            passDataComment = list;
        });
       
       postModel.findPost(req.query.title, function(post){
           passDataPost = post;
           
           resp.redirect('./profile', {postData: passDataPost, loginData: passDataLogin, commentData: passDataComment});
       });
       
    });
    
    server.get('/deletePost', function(req, resp){
        console.log(req.query.id + " <--- ID of the Post in postController");
        var passDataPost;
        var passDataLogin;
        var passDataComment;
        var allPostData;
        
        postModel.findPostbyID(req.query.id, function(data){
            passDataPost = data;
            
            postModel.deletePost(req.query.id);
            console.log("Post deleted!");
        });
        
        commentModel.allComments(function(list){
            passDataComment = list;
        });
        
        postModel.allPosts(function(list){
            allPostDataData = list;
        });
        
        loginModel.findUser(req.session.user, function(list){
           passDataLogin = list;
            console.log(passDataLogin + " <---- loginData ");
            resp.render('./pages/profile', {data: passDataLogin, postData: passDataPost, commentData: passDataComment, loggedIn: req.session.user});
        });
    });
    
    server.get('/findPostbyID', function(req,resp){
           var passDataPost, passDataComment, passDataLogin;

            loginModel.findUser(req.query.user, function(user){
                passDataLogin = user;
             });
        
             commentModel.allComments(function(list){
                passDataComment = list;
            });
        
           postModel.findPost(req.query._id, function(post){
               passDataPost = post;

               resp.redirect('./profile', {postData: passDataPost, loginData: passDataLogin, commentData: passDataComment});
           });

        }); 
    
    server.get('/upvote', function(req,resp){
      var passDataLikes;
        console.log("hellooooooooooooo")
        postModel.upvotePost(req.query.user, req.query.title, req.query.likes, function(post){
                passDataLikes = likes;
                
                resp.render('.pages/post', {likesData: passDataLikes});
        });
    });
    
    server.get('/downvote', function(req,resp){
      var passDataLikes;
        
        postModel.downvotePost(req.query.user, req.query.title, req.query.likes, function(post){
                passDataLikes = likes;
                
                resp.render('.pages/post', {likesData: passDataLikes});
             });
    });
}

module.exports.Activate = PostModule;