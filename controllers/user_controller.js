const path = require('path')
const UserModel = require('../models/user')
const passport = require("passport");
// Create and Save a new user
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.userName && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" })
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password
    });

    await user.save().then(data => {
        return res.render(path.resolve('views/login.ejs'))
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};


// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        } else {
            res.send({
                message: "User deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.login = async (req, res) => {
    //level 5
    let user = new UserModel({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user, function (err){
        if (err){
            console.log(err)
        }else {
            passport.authenticate("local")(req, res, function () {
                console.log(req)
                res.redirect("/check")
            });
        }
    })
}

exports.register = async (req, res) => {
    //level 5
    UserModel.register({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, email:req.body.email}, req.body.password, function (err, user) {
        if (err) {
            console.log(err)
            res.redirect("/signup")
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/profile")
            });
        }
    })
}

exports.logout = async (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}