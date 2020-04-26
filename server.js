// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
var assets = require('./assets');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser('akjskdjak'));

app.use("/assets", assets);

app.set('view engine', 'pug')

const db = require('./db');

const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const transactionRouter = require('./routers/transactionRouter');
const authRouter = require('./routers/authRouter');

const cookieMiddleware = require('./middlewares/cookie.middleware'); // middleware to count number access
const authMiddleware = require('./middlewares/auth.middleware');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cookie', (req, res) => {
  res.cookie('cookie', 1);
  res.send('Set counter cookie');
});

app.use('/users', authMiddleware.requireAdmin, userRouter);

app.use('/books', authMiddleware.requireAdmin, bookRouter);

app.use('/transactions', authMiddleware.requireAuth, transactionRouter);

app.use('/auth', authRouter);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
