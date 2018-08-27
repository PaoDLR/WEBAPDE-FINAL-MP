//This is the modelComment.
//All connections to the collection called login will be done using this class.

//Contain all Mongoose code that will be used for the login
const mongoose = require('./connectionBase').connection;

const commentSchema = new mongoose.Schema({
  parentPost: { type: String },
  user: { type: String },
  content: { type: String },
  //add time and picture
},{versionKey: false});

const commentModel = mongoose.model('comment', commentSchema);

function allComments(callback){
    commentModel.find({}, function(err, comment){
        if(err) return console.error(err);
        callback(comment);
    });
}

module.exports.allComments = allComments;

function addComment(username, content, parentPost, callback){
    const commentInstance = commentModel({
        user: username,
        content: content,
        parentPost: parentPost
    });

    //to save this into the database, call the instance's save function.
    //it will have a call-back to check if it worked.
    commentInstance.save(function (err, fluffy) {
        if(err) return console.error(err);
        callback();
    });
}

module.exports.addComment = addComment;

function editComment(username, editedComment, callback){
    const editQuery = { username };
    
    commentModel.findOne(editQuery, function (err, comment){
        comment.content = editedComment;
        
        comment.save(function(err, result){
            if (err) return console.error(err);
            callback(result);
        });  
    });
}

module.exports.editComment = editComment;

//function deleteComment(username, deletedComment, callback){
//    const deleteQuery = { username };
//    
//    console.log(" pls pls pls pls pls ");
//    
//    commentModel.deleteComment(deleteQuery, function (err, comment){
//        comment.content = deleteComment;
//        
//        comment.delete(function(err, result){
//            if(err) return console.error(err);
//            callback(result);
//        });
//    });
//}

function findCommentbyID(id, callback){
    const findQuery = { _id: id }
        console.log(id + " <---- found comment by ID in commentModel");
    commentModel.findOne(findQuery, function (err, comment) {
        console.log(comment + " <---- found post by ID");
        callback(comment);
    });
}

module.exports.findCommentbyID = findCommentbyID;

function deleteComment(id, callback){

    commentModel.deleteOne({_id: id}, function(err){
        if(!err)
            console.log("deleted -------------------------");
        else
            console.log("error ---------------------------");
        
    });
    
    
//    commentModel.find({_id: id}.remove(callback));
    
//    commentModel.deleteOne({_id: id}, function(err){
//        });
}

module.exports.deleteComment = deleteComment;