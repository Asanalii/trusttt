let mongoose = require('mongoose')

const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        unique: true
    },
    password:{
        type:String,
        }
});
userSchema.plugin(passportLocalMongoose)

let UserModel = new mongoose.model('User',userSchema);
passport.use(UserModel.createStrategy())

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = UserModel;