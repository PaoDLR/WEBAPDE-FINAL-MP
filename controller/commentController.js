const commentModel = require('../model/commentModel');
const postModel = require('../model/postModel');
const loginModel = require('../model/loginModel');

function CommentModule(server){
    
    server.get('/edit-comment', function(req, resp){
        
        var passDataComment;
        
        commentModel.editComment(req.query.comment, req.query.editComment, function(comment){
            passDataComment = comment;
            console.log(passDataComment +" <--------------------- this is passDataComment");
            resp.render('./pages/editResult',{ data:passDataComment });
        });
    });
    
    server.get('/delete-comment', function(req, resp){
        console.log("sup---------------");
        var passDataComment;
        var passDataLogin; 
        var allPostDataData;
        
         commentModel.findCommentbyID(req.query.id, function(comment){
            passDataComment = comment;
            
            commentModel.deleteComment(req.query.id);
        });
        
        postModel.allPosts(function(list){
            allPostDataData = list;
        });
        
        console.log(passDataComment + " <--------- deleted comment");
        
        loginModel.findUser(req.session.user, function(list){
           passDataLogin = list;
            console.log(passDataLogin + " <---- loginData ");
            resp.render('./pages/post', {loginData: passDataLogin, data: allPostDataData, commentData: passDataComment, loggedIn: req.session.user});
        });
        
    });
}

module.exports.Activate = CommentModule;