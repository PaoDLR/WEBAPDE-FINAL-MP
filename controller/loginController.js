const loginModel = require('../model/loginModel');
const postModel = require('../model/postModel');

function LoginModule(server){

    //Leads you to the sign-in page
    server.get('/signin', function(req, resp){
       resp.render('./pages/signin');
    });

    //Creating an account
     server.post('/signup', function(req, resp){    
         
       loginModel.addLogin(req.body.user, req.body.pass, req.body.desc, function(){
          //This should render the home page with the data of the post generated.
          resp.redirect('./index'); 
       });
    });

    //Logging in to an account
    server.post('/login', function(req, resp){
        
        loginModel.checkLogin(req.body.user, req.body.pass, function(result){
          
          if(result){
              //This should advance and go to home page with the posts generated.
              resp.redirect('./index');
          }
          else{
              //This should go back to sign-in cause user failed to login successfully.
              resp.redirect('./signin');
          }
      });

    });

}

module.exports.Activate = LoginModule;