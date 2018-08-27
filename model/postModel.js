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

function findPost(title, callback){
    const findQuery = { title: title }
        
    postModel.findOne(findQuery, function (err, post) {
        console.log("found post");
        callback(post);
    });
}

module.exports.findPost = findPost;

function editPost(id, title, description, content, callback){
    const findQuery = {_id: id};
    
    var eTitle = title;
    var eDesc = description;
    var eContent = content;
    
    postModel.findOne(findQuery, function(err, post){
       console.log("found post to be edited!");
        post.title = eTitle;
        post.desc = eDesc;
        post.content = eContent;
        
        post.save(function (err, result){
            if (err) return console.error(err);
            callback(result);
        });
    });
}

module.exports.editPost = editPost;

function deletePost(id){
    
    postModel.deleteOne({ _id: id }, function (err) {
    });
}

module.exports.deletePost = deletePost;

function findPostbyID(id, callback){
    const findQuery = { _id: id }
        console.log(id + " <---- found post by ID in postModel");
    postModel.findOne(findQuery, function (err, post) {
        console.log(post + " <---- found post by ID");
        callback(post);
    });
}

module.exports.findPostbyID = findPostbyID;

function upvotePost(title, likes, callback)
{
    const upvoteQuery = { title: title, likes: likes }
    
    
    postModel.findOne(upvoteQuery, function(err, post){
//        upvoteQuery.likes.aggregate({$add:likes, 1});
        upvoteQuery.likes += 1;
        if(err) return console.error(err);
        callback();
    })
}

module.exports.upvotePost = upvotePost;

function downvotePost(title, likes, callback)
{
    const downvoteQuery = { title: title, likes: likes }
    console.log("DOWN DOWN DOWN!!!!!!!!!!!!!!!!!!!!!")
    
    postModel.findOne(downvoteQuery, function(err, post){
        while(likes >= 0)
            downvoteQuery.likes -= 1;
        if(err) return console.error(err);
        callback();
    })
}

module.exports.downvotePost = downvotePost;