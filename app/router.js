const express = require('express');
const mainController = require('./controllers/mainController.js');
const adminController = require('./controllers/adminController.js');
const userController = require('./controllers/userController.js');
const validate = require('./validate.js');
const schema = require('./schemas/form.schema.js');

const router = express.Router();

router.get('/', mainController.homePage);
router.get('/tableau/:id', mainController.array);
router.get('/robert', adminController.adminHome);
router.post('/robert', validate('body', schema), adminController.admin);
router.get('/delete/:id', adminController.delete);
router.get('/robert/message/:id', adminController.adminOneMessage);

router.post('/updateArrayTitle/:id', adminController.arrayUpdatedTitle);
router.post('/updateArrayDesc/:id', adminController.arrayUpdatedDesc);
router.post('/updateArrayPrice/:id', adminController.arrayUpdatedPrice);

router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/signup', userController.getSignupPage);
router.post('/signup', userController.signup);



module.exports = router;

