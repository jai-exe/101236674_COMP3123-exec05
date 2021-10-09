const express = require('express');
const app = express();
const router = express.Router();
let user = require('./user');
let user_details = JSON.stringify(user);
let jsonArray = JSON.parse(user_details);

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

app.use(express.static('public'))

router.get('/home', (req,res) => {
  res.send('This is home router');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {

  // let user_details = JSON.stringify(user);
  res.write(user_details);
  res.end();
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/



router.get('/login', (req,res) => {

  let username = req.query['usr']
  let password = req.query['pwd']

  let user_name = jsonArray.username;
  let pass_word = jsonArray.password;

  let response;

  if (user_name.includes(username) && pass_word.includes(password)){
    response = {
      "status":"true",
      "message":"User is valid"
    }
  }
  else if(!user_name.includes(username)){
    response = {
      "status":"false",
      "message":"User Name is invalid"
    }
  }
  else if(!pass_word.includes(password)){
    response = {
      "status":"false",
      "message":"Password is invalid"
    }
  }

  res.send(response);
  
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  res.send('This is logout router');
});

app.use('/', router);

let server = app.listen(8089, () => {
  let host = server.address().address
  let port = server.address().port
  console.log("server running at http://%s:%s", host, port)
})