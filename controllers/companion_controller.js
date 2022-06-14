const mongoose = require('mongoose')
const path = require('path')
const CompanionModel = require('../models/companion')


exports.new = async(req,res)=>{
    res.render('newCompanion',{companion : new CompanionModel()})
}

exports.main = async(req,res)=>{
    const companions = await CompanionModel.find().sort({createdAt: 'desc'})
    res.render('companion',{companions: companions})
}

exports.findBySlug= async(req,res)=>{
    const companion = await CompanionModel.findOne({slug: req.params.slug})
    if(companion == null) res.redirect('/companions')
    res.render('show',{companion:companion});
}

exports.add = (async (req, res) => {
    let companion = new CompanionModel({
        location: req.body.location,
        destination: req.body.destination,
        time: req.body.time
    })

    try{
        companion = await companion.save();
        res.redirect(`/companion`)
    } catch (e) {
        res.render('index')
    }

})

exports.delete = (async (req,res) =>{
    await CompanionModel.findByIdAndDelete(req.params.id)
    res.redirect('/companion')

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