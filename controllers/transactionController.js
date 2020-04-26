const db = require('../db');
const uuid = require('uuid/v4');

module.exports.index = (req, res) => {
  var transactions = db.get('transactions').value()
  .filter(item => item.userId === req.signedCookies.userId)
  .map(item => {
    return {
      bookName: db.get('books').find({id: item.bookId}).value().title,
      userName: db.get('users').find({id: item.userId}).value().name,
      isComplete: item.isComplete,
      id: item.id
    }
  })
  res.render('transactions/index', {
    transactions: transactions,
    isAdmin: false
  });
}

module.exports.getCreate = (req, res) => {
  var user = db.get('users').find({id: req.signedCookies.userId}).value();
  var books = db.get('books').value();
  var users = [];
  if(user.isAdmin) users = db.get('users').value();
  else users = [user];
  res.render('transactions/create', {
    books: books,
    users: users
  });
}

module.exports.postCreate = (req, res) => {
  db.get('transactions').push({
    id: uuid(),
    bookId: req.body.bookId,
    userId: req.body.userId
  }).write();
  res.redirect('/transactions')
}

module.exports.complete = (req, res) => {
  if(!db.get('transactions').find({id: req.params.id}).value()){
    res.redirect('/transactions');
    return;
  }
  db.get('transactions').find({id: req.params.id}).assign({isComplete: true}).write();
  res.redirect('/transactions');
}