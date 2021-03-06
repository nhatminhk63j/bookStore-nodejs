const db = require('../db')
const bcrypt = require('bcrypt');
 var Mailgun = require('mailgun-js');
require('dotenv').config();

const mailgun = new Mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

module.exports.login = (req, res, next) => {
  var error = [];
  var email = req.body.email;
  var password = req.body.password;
  if(!email){
    error.push('Email is required!');
  }
  if(!password){
    error.push('Password is required!');
  };
  console.log(process.env);
  if(email && password){
    var user = db.get('users').find({email: email}).value();
    if(!user) {
      error.push('Not exist account!');
      res.render('auth/login', {
        error: error,
        email: email,
        password: password
      })
      return ;
    }
    if(user.wrongLoginCount === 3) {
      var data = {
        from: 'nhatngo11a1@gmail.com',
        to: user.email,
        subject: 'Alert from Ngo Sach Nhat',
        html: 'You enter wrong password 3 times. Please enter true!'
      }
      mailgun.messages().send(data, function (err, body){
        if(err) console.log('Have error send mail!');
        else console.log("Mail successful!");
      });
    }
    if(user.wrongLoginCount === 4) error.push('Wrong password 4 times long!')
    if(bcrypt.compareSync(password, user.password )){
      res.cookie('userId', user.id, { signed: true });
      next();
    } else {
      error.push('Wrong password!');
      db.get('users').find({id: user.id}).assign({wrongLoginCount: user.wrongLoginCount + 1}).write();
      res.render('auth/login', {
        error: error,
        email: email,
        password: password
      })
      return ;
    }
  }
  res.render('auth/login', {
    error: error,
    email: email,
    password: password
  })
}

module.exports.register = (req, res, next) => {
  var error = [];
  console.log('register')
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  if(!email) error.push("Email is required!");
  if(!name) error.push("Name is required!");
  if(!password) error.push("Password is required!");
  
  if(email && name && password){
    next();
  }
  
  res.render('auth/register', {
    error: error,
    name: name,
    email: email,
    password: password
  })
}