//Contain all Mongoose code that will be used for posts

const mongoose = require('./connectionBase').connection;

const postSchema = new mongoose.Schema({
    user: { type: String },
    title: { type: String },
    desc: { type: String },
    content: { type: String },
    likes: { type: Number },
    //add time and picture
},{versionKey: false});

const postModel = mongoose.model('post', postSchema);

function allPosts(callback){
    postModel.find({}, function(err, post){
        if(err) return console.error(err);
        callback(post);
    });
}

module.exports.allPosts = allPosts;

function addPost(username, title, description, content, likes, callback){
    //Creating a new instance can be made this way.
    const postInstance = postModel({
        user: username,
        title: title,
        desc: description,
        content: content,
        likes: likes
    });

    //to save this into the database, call the instance's save function.
    //it will have a call-back to check if it worked.
    postInstance.save(function (err, fluffy) {
        if(err) return console.error(err);
        callback();
    });
}

module.exports.addPost = addPost;