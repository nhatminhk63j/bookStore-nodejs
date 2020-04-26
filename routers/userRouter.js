const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');


router.get('/', controller.index);

router.get('/create', controller.getCreate);

router.post('/create', controller.postCreate);

router.get('/:id/detail', controller.getDetail);

router.get('/:id/modify', controller.getModify);

router.post('/:id/modify', controller.postModify)

router.get('/:id/delete', controller.delete)

module.exports = router;