const express=require('express')
const router = express.Router();
const mongoose = require("mongoose");
const ArticleController = require("../controllers/article_controller");
const UserController = require("../controllers/user_controller");

express().use(express.urlencoded({extended:false}))

router.get('/',ArticleController.main)
router.get('/new',ArticleController.new);
router.get('/:slug',ArticleController.findBySlug)
router.post('/',ArticleController.add)
router.delete('/:id',ArticleController.delete);
router.get('/edit/:id',ArticleController.edit)
router.patch('/edit/:id',ArticleController.update)



module.exports = router;