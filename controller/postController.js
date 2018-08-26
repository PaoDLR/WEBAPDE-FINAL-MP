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
      
        var passDataLogin, passDataComment;

        loginModel.allUsers(function(list){
            passDataLogin = list;
        });

        if(req.query.comment != null || req.query.comment != undefined || req.query.comment == ''){
            
            commentModel.addComment('AlexRotorReyes', req.query.comment, req.query.title, function(){
                console.log("saved comment to database!");
            });
            
        }

        commentModel.find({}, function (err, comment){
            passDataComment = comment;
        });

        const findQuery = { title: req.query.title }

        postModel.findOne(findQuery, function (err, post) {
            console.log("found");
            resp.render('./pages/post', { data:post, commentData: passDataComment, loginData: passDataLogin });
        });
    
    });
    
}

module.exports.Activate = PostModule;