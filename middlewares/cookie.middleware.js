module.exports.countCookie = (req, res, next) => {
  res.cookie('cookie', parseInt(req.cookies.cookie) + 1);
  console.log("Number access website: ", parseInt(req.cookies.cookie) + 1);
  next();
}