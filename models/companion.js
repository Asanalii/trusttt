const mongoose = require('mongoose')
const companionSchema = new mongoose.Schema({
    location: {
        type: String,
        required:true
    },
    destination :{
        type: String
    },
    time: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default : Date.now
    }

})

module.exports = mongoose.model('Companion',companionSchema)
