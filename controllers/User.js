const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('../config/bcrypt');
const BCRYPT_SALT_ROUNDS = 12;


module.exports.create = (req, res, next) => {
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
        req.body.password = hashedPassword;
        user = new User(req.body);
        user.save().then(
            (result) => {
                res.status(200).json({'message': 'Insert user successfully'});
            }
        ).catch(
            (error) => {
                res.status(400).json({'message': error});
            }
        );
    })
    .catch(
        (error) => {
            res.status(400).json({'message': error});
        }
    );
}

module.exports.addRole = (req, res, next) => {
    query = User.findById(req.body.user_id);
    query.exec().then(
        (user) => {
            try {
                user.addRole(req.body.role_id);
            } catch (error) {
                res.status(400).json({'message': error.message});    
            }

            user.save().then(
                (result) => {
                    res.status(200).json({'message': 'Role added successfully'});
                }
            ).catch(
                (error) => {
                    if (error !== null) {
                        res.status(400).json({'message': error});
                    }
                }
            );
        }
         
    ).catch(
        (error) => {
            if (error !== null) {
                res.status(400).json({'message': error});
            }
        }
    );
}

module.exports.get = (req, res, next) => {
    if (req.params.id) {
        query = User.findById(req.params.id).populate(
            {
                path: 'roles',
                populate: {
                    path: 'permissions'
                }
            }
        );
    } else {
        query = User.find({}).populate(
            {
                path: 'roles',
                populate: {
                    path: 'permissions'
                }
            }
        );
    }
    query.exec().then(
        (user) => {
            if (key) {
                res.status(200).json( { user : user});
            } else {

                res.status(200).json( { users : user});
            }
        }
         
    ).catch(
        (error) => {
            if (error !== null) {
                res.status(400).json({'message': error});
            }
        }
    );
}

module.exports.login = (req, res, next) => {
    User.authenticate(req.body.username, req.body.password, 
        (user) => {
            if (user) {
                res.status(202).json({token : jwt.sign(user, process.env.SECRET)} );
            } else {
                res.status(403).json({'message': 'Forbidden'})
            }
        }
    )    
}