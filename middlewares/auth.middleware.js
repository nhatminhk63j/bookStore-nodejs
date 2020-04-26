const db = require('../db');
module.exports.requireAuth = (req, res, next) => {
  if(!req.signedCookies.userId){
    res.redirect('/auth/login');
    return ;
  }
  var user = db.get('users').find({id: req.signedCookies.userId}).value();
  if(user && user.isAdmin){
    var transactions = db.get('transactions').value().map(item => {
      return {
        bookName: db.get('books').find({id: item.bookId}).value().title,
        userName: db.get('users').find({id: item.userId}).value().name,
        isComplete: item.isComplete,
        id: item.id
      }
    })
    res.render('transactions/index', {
      isAdmin: true,
      transactions: transactions
    })
    return;
  }
  else if(user){
    next();
  }
}

module.exports.requireAdmin = (req, res, next) => {
  if(!req.signedCookies.userId){
    res.redirect('/auth/login');
    return ;
  }
  var user = db.get('users').find({id: req.signedCookies.userId}).value();
  if(user.isAdmin){
    next();
    return;
  }
  res.redirect('/auth/not-allow-to-access');
}