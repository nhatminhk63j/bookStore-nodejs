const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController')
const validate = require('../validates/authValidate');

router.get('/login', controller.getLogin);

router.post('/login', validate.login, controller.postLogin);

router.get('/register', controller.getRegister);

router.post('/register', validate.register, controller.postRegister);

router.get('/not-allow-to-access', controller.unAuth);

module.exports = router;