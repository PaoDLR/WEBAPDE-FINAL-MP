//This is the modelLogin.
//All connections to the collection called login will be done using this class.

//Contain all Mongoose code that will be used for the login

const mongoose = require('./connectionBase').connection;

const crypto = require('crypto');

const loginSchema = new mongoose.Schema({
  user: { type: String },
  pass: { type: String },
  desc: { type: String },
  dp  : { type: String }
},{ versionKey: false });

const loginModel = mongoose.model('login', loginSchema);

//Checks if the user login is successful or not
function checkLogin(username, password, callback){
    
  var hpass = password;
  var hashedPass = crypto.createHash('md5').update(hpass).digest('hex');      
  
  const searchQuery = { user: username, pass: hashedPass };
//    console.log(username + " <--------- Username Data ");
//    console.log(hashedPass + " <--------- HPassword Data ");

  //The model can be found via a search query and the information is found
  //in the login function. Access the information like a JSon array.
  loginModel.findOne(searchQuery, function (err, login) {
    if(err) return console.error(err);
    var username;
      
    if(login != null)
        username = login.user;
    else
        username = undefined;
      
    callback((login != undefined && login._id != null), username);
//    console.log(login + " <--------- Login Data ");
  });
}

module.exports.checkLogin = checkLogin;

function addLogin(username, password, description, callback){
   //Creating a new instance can be made this way.
  var hpass = password;
  var hashedPass = crypto.createHash('md5').update(hpass).digest('hex');

  const loginInstance = loginModel({
    user: username,
    pass: hashedPass,
    desc: description,
    dp: 'default.png'
  });
  
  //to save this into the database, call the instance's save function.
  //it will have a call-back to check if it worked.
  loginInstance.save(function (err, fluffy) {
    if(err) return console.error(err);
    callback();
  });
    
}

module.exports.addLogin = addLogin;

function allUsers(callback){
    loginModel.find({}, function(err, login){
        if(err) return console.error(err);
        callback(login);
//        console.log(login + " <--------- Login Data ");
    });
}

module.exports.allUsers = allUsers;

function findUser(username, callback){
    const findQuery = { user: username }

    loginModel.findOne(findQuery, function(err, login){
        console.log("found user");
        callback(login);
    });
}

module.exports.findUser = findUser;