const db = require('../db')
const bcrypt = require('bcrypt');

module.exports.login = (req, res, next) => {
  var error = [];
  var email = req.body.email;
  var password = req.body.password;
  if(!email){
    error.push('Email is required!');
  }
  if(!password){
    error.push('Password is required!');
  }
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
    if(user.wrongLoginCount === 4) error.push('Wrong password 4 times long!')
    else if(bcrypt.compareSync(password, user.password )){
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