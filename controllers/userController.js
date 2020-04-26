const db = require('../db');
const uuid = require('uuid/v4');

module.exports.index = (req, res) => {
  res.render('users/index', {
    users: db.get('users').value()
  });
}

module.exports.getCreate = (req, res) => {
  res.render('users/create');
}

module.exports.postCreate = (req, res) => {
  db.get('users').push({id: uuid(), name: req.body.name}).write();
  res.redirect('/users');
}

module.exports.getDetail = (req, res) => {
  res.render('users/detail', {
    user: db.get('users').find({id: req.params.id}).value()
  })
}

module.exports.getModify = (req, res) => {
  res.render('users/modify', {
    user: db.get('users').find({id: req.params.id}).value()
  });
}

module.exports.postModify = (req, res) => {
  db.get('users').find({id: req.params.id}).assign({name: req.body.name}).write();
  res.redirect('/users');
}

module.exports.delete = (req, res) => {
  db.get('users').remove({id: req.params.id}).write();
  res.redirect('/users');
}