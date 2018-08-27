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
    
    server.get('/about', function(req, resp){
       resp.render('./pages/about');
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
            allPostData = list;
        });
        
        loginModel.findUser(req.session.user, function(list){
           passDataLogin = list;
            console.log(passDataLogin + " <---- loginData ");
            resp.render('./pages/profile', {data: passDataLogin, postData: allPostData, commentData: passDataComment, loggedIn: req.session.user});
        });
    });
    
    server.get('/searchPosts', function(req, resp){
        console.log(req.query.search); 
        
        var passDataPost, passDataLogin;
        var foundPost = new Array();
        var searchedPost;
        
        postModel.allPosts(function(list){
            passDataPost = list;
            console.log(passDataPost + " <---- passDataPost");
            
            for(var i = 0; i < passDataPost.length; i++){
                console.log(passDataPost[i].title + " <--- title of data");
                if(passDataPost[i].title.includes(req.query.search)){
                       foundPost[i] = passDataPost[i];
                        console.log(passDataPost[i] + " <--- whatever")
                }
            }
            resp.render('./pages/index', { postData: foundPost, loginData: passDataLogin, loggedIn: req.session.user });
        });
        
        loginModel.allUsers(function(list){
            passDataLogin = list;
        });
    });
    
    server.get('/editPost', function(req, resp){
        console.log(req.query.id + " <--- ID of the Post in postController");
        var passDataPost;
        var passDataLogin;
        var passDataComment;
        var allPostData;
        
        postModel.findPostbyID(req.query.id, function(data){
            passDataPost = data;
            
            postModel.editPost(req.query.id, req.query.title, req.query.desc, req.query.content, function(result){
               if(result){
                    console.log("Post editted!");    
                }else    
                    console.log("Post NOT editted!"); 
            });   
            
        });
        
        commentModel.allComments(function(list){
            passDataComment = list;
        });
        
        postModel.allPosts(function(list){
            allPostData = list;
        });
        
        loginModel.findUser(req.session.user, function(list){
           passDataLogin = list;
            console.log(passDataLogin + " <---- loginData ");
            resp.render('./pages/profile', {data: passDataLogin, postData: allPostData, commentData: passDataComment, loggedIn: req.session.user});
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
    
    server.post('/upvote', function(req,resp){
        
        var passDataLogin, passDataComment, passDataPost;

        loginModel.allUsers(function(list){
            passDataLogin = list;
        });

        commentModel.allComments(function(list){
            passDataComment = list;
        });
        
        console.log("upvote------------------");
        postModel.upvotePost(req.body.title, function(post){
            passDataPost = post;
            
            resp.render('./pages/post', { data: passDataPost, commentData: passDataComment, loginData: passDataLogin, loggedIn: req.session.user });
        });
    });
    
    server.post('/downvote', function(req,resp){
        var passDataLogin, passDataComment, passDataPost;

        loginModel.allUsers(function(list){
            passDataLogin = list;
        });

        commentModel.allComments(function(list){
            passDataComment = list;
        });
        
        console.log("downvote------------------");
        postModel.downvotePost(req.body.title, function(post){
            passDataPost = post;
            
            resp.render('./pages/post', { data: passDataPost, commentData: passDataComment, loginData: passDataLogin, loggedIn: req.session.user });
        });
    });
}

module.exports.Activate = PostModule;