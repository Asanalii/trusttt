const express=require('express')
const router = express.Router();
const mongoose = require("mongoose");
const CompanionController = require("../controllers/companion_controller");
const UserController = require("../controllers/user_controller");

express().use(express.urlencoded({extended:false}))

router.get('/',CompanionController.main)
router.get('/newCompanion',CompanionController.new);
router.get('/:slug',CompanionController.findBySlug)
router.post('/',CompanionController.add)
router.delete('/:id',CompanionController.delete);



module.exports = router;