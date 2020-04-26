const db = require('../db');

module.exports.index = (req, res) => {
  res.render('books/index', {
    books: db.get('books').value()
  });
}

module.exports.getModify = (req, res) => {
  res.render('books/modify', {
    book: db.get('books').find({id: req.params.id}).value()
  })
}

module.exports.postModify = (req, res) => {
  db.get('books').find({id: req.params.id}).assign({title: req.body.title}).write();
  res.redirect('/books')
}

module.exports.delete = (req, res) => {
  db.get('books').remove({id: req.params.id}).write();
  res.redirect('/books')
}