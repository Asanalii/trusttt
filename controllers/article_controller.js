const mongoose = require('mongoose')
const path = require('path')
const ArticleModel = require('../models/article')
const {update} = require("./user_controller");


exports.new = async(req,res)=>{
    res.render('new',{article : new ArticleModel()})
}

exports.main = async(req,res)=>{
    const articles = await ArticleModel.find().sort({createdAt: 'desc'})
    res.render('articles',{articles: articles})
}

exports.findBySlug= async(req,res)=>{
    const article = await ArticleModel.findOne({slug: req.params.slug})
    if(article == null) res.redirect('/articles')
        res.render('show',{article:article});
}

exports.add = (async (req, res) => {
    let article = new ArticleModel({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
       article = await article.save();
       res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        res.render('new')
    }
})

exports.delete = (async (req,res) =>{
    await ArticleModel.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})

exports.edit = (async(req,res)=>{
    const article = await ArticleModel.findById(req.params.id)
    res.render('edit',{article:article})
})

exports.update = (async(req,res)=>{
    let article = await ArticleModel.findById(req.params.id)
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try{
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        res.render(`articles/${update}`,{article:article})
    }
})

/*const articles=[{
        title: 'Articles',
        date: new Date(),
        description:'Test description'
    },
        {
            title: 'Article2',
            date: new Date(),
            description:'Test description2'
        },
        {
            title: 'Article3',
            date: new Date(),
            description:'Test description3'
        }
    ]*/

/*router.get('/new',(req,res)=>{
    res.render('new',{article : new ArticleModel()})
})*/