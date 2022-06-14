const express=require('express')
const router = express.Router();
var path = require('path')
/*const ejs=require('ejs')*/



router
    .route("/")
    .get((req,res)=> res.render(path.resolve('views/chat1.ejs')))
    .post((req,res) => res.send("POST"));

module.exports = router;