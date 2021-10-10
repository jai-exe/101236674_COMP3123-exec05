const express = require('express');
const app = express();
const router = express.Router();
let user = require('./user');
let user_details = JSON.stringify(user);
let fs = require('fs');
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

  let uname = req.query['usr']
  let pword = req.query['pwd']

  fs.readFile("./user.json", (err, jsonString) => {
    if (err) {
      throw err;
    }
    try {
      var user = JSON.parse(jsonString);
      if(uname == user.username && pword == user.password){
        response = {
          status: true,
          message: "User Is valid"
        }
      }
      else if(uname != user.username && pword == user.password){
        response = {
          status: false,
          message: "User Name is invalid"
        }
      }
      else if(uname == user.username && pword != user.password){
        response = {
          status: false,
          message: "Password is invalid"
        }
      }
      res.send(JSON.stringify(response));
      
    } catch (err) {
      throw err;
    }
  });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  let uname = req.params.username;
  res.send(`<b>${uname} successfully logout.<b>`)
});

app.use('/', router);

let server = app.listen(8089, () => {
  let host = server.address().address
  let port = server.address().port
  console.log("server running at http://%s:%s", host, port)
})