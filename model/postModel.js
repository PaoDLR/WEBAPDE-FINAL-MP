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