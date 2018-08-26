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