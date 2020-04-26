const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController')

router.get('/', controller.index);

router.get('/:id/modify', controller.getModify);

router.post('/:id/modify', controller.postModify);

router.get('/:id/delete', controller.delete);

module.exports = router;