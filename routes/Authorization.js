const express = require('express');
const controller = require('../controllers/Authorization');
const router = express.Router();

router.post('/authorize', function(req, res, next) {
    controller.authorize(req, res, next);
});



module.exports = router;
