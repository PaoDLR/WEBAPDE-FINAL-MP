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