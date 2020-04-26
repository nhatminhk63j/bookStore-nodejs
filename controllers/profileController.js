const db = require('../db');

module.exports.getProfile = (req, res) => {
    res.render('profile/index', {
      user: db.get('users').find({id: req.signedCookies.userId}).value()
    })
}

module.exports.getAvatar = (req, res) => {
    res.render('profile/avatar', {
        user: db.get('users').find({id: req.signedCookies.userId}).value()
    })
}

module.exports.postAvatar = (req, res) => {
    // res.send(req.imageDetails);
    db.get('users').find({id: req.signedCookies.userId}).assign({avatarUrl: req.imageDetails.cloudImage}).write();
    res.redirect('/profile');
}