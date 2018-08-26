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

