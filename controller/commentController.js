const commentModel = require('../model/commentModel');

function CommentModule(server){
    
    server.get('/edit-comment', function(req, resp){
        
        var passDataComment;
        
        commentModel.editComment(req.query.comment, req.query.editComment, function(comment){
            passDataComment = comment;
            console.log(passDataComment +"this is passDataComment ----------------------------------------");
            resp.render('./pages/editResult',{ data:passDataComment });
        });
        
        
    
    });
    
}

module.exports.Activate = CommentModule;