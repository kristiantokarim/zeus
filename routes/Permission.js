const express = require('express');
const controller = require('../controllers/Permission');
const router = express.Router();

router.post('/', function(req, res, next) {
    controller.create(req, res, next);
});

router.get('/:id?', function(req, res, next) {
    controller.get(req, res, next);
});


module.exports = router;
