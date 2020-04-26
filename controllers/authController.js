const db = require('../db');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

module.exports.getLogin = (req, res) => {
  res.render('auth/login');
}

module.exports.postLogin = (req, res) => {
  res.redirect('/transactions');
}

module.exports.getRegister = (req, res) => {
  res.render('auth/register');
}

module.exports.postRegister = (req, res) => {
  db.get("users").push({
    id: uuid(),
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12)
  }).write();
  
  res.redirect('/auth/login');
}

module.exports.unAuth = (req, res) => {
  res.render('auth/unAuth');
}