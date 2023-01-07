var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'smart-keyring-login'
require('dotenv').config()

const request = require('request');

app.use(cors())


const mysql = require('mysql2');
const connection = mysql.createConnection(process.env.DATABASE_URL)



app.post('/register', jsonParser , function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    connection.execute(
      'INSERT INTO users (email, password, fname , lname) VALUES (?, ?, ?, ?)',
      [req.body.email ,hash ,req.body.fname ,req.body.lname],
      function(err, results, fields) {
        if (err) {
          res.json({status :"error" , massage: err })
          return
        }
        res.json({status: "ok", message: "Register succes"})
      }
    );
  });
  
});

app.post('/login', jsonParser , function (req, res, next) {
  connection.execute(
    'SELECT * FROM users WHERE email=?',
    [req.body.email],
    function(err, users, fields) {
      if (err) { res.json({status :"error" , massage: err }); return }
      if (users.length == 0 ) { res.json({status :"error" , massage: "no users found" }); return }
      bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
        if (isLogin) {
          var token = jwt.sign({ email: users[0].email }, secret, {expiresIn: '3h'});
          res.json({status: 'ok', message: 'login success', token})
        } else {
          res.json({status: 'error', message: 'login failed'})
        }
      });
    }
  );
});

app.post('/authen', jsonParser , function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, secret)
    connection.execute(
      'SELECT * FROM users WHERE email=?',
      [decoded.email],
      function(err, results, fields) {
        res.json({status : 'ok',user: results[0]})
      }
    );
   

  } catch(err){
    res.json({status: 'error', message: err.massage})
  }
  
});



const lineNotify = require('line-notify-nodejs')('qBlR2OJPR8wk2ZE4X6ctml27EVYV3AAUe0iWpWiiWR7');

app.post('/send',jsonParser, (req, res, next) => {
  
  res.send(req.body.password)
  lineNotify.notify({
    message: req.body.password,
  }).then(() => {
    console.log('send completed!');
  });
})

app.post("/authen/:id", async (req, res) => {
  const id = req.params.id;

  try {
      connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results, fields) => {
          if (err) {
              console.log(err);
              return res.status(400).send();
          }
          res.status(200).json(results)
      })
  } catch(err) {
      console.log(err);
      return res.status(500).send();
  }
});


app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
});