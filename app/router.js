const express = require('express');
const mainController = require('./controllers/mainController.js');
const adminController = require('./controllers/adminController.js');

const router = express.Router();

router.get('/', mainController.homePage);
router.get('/tableau/:id', mainController.array);
router.get('/robert', adminController.adminHome);
router.post('/robert', adminController.admin);
router.get('/admin/message', adminController.adminMail);



module.exports = router;

