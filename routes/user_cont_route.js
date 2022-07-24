const express = require('express')
const UserController = require('./../controllers/user_controller')
const router = express.Router();

/*router.get('/',UserController.findAll);
router.get('/:id',UserController.findOne);
router.patch('/:id',UserController.update);
router.delete('/:id',UserController.destroy);*/

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/logout',UserController.logout);



module.exports = router

