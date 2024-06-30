const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
router.post('/check',userController.check);
// router.get('/display',userController.display);
router.get('/questiondisplay',userController.questiondisplay)

module.exports = router;