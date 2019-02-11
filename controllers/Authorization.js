const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.authorize = (req, res, next) => {
    query = User.findById(jwt.decode(req.headers.jwt)._id).populate(
        {
            path: 'roles',
            populate: {
                path: 'permissions',
                match: { 
                    action: req.body.action,
                    resource: req.body.resource, 
                },
            }
        }
    );
    query.exec().catch(
        (err) => {
            res.status(401).json({'authorized': false});
        }
    ).then(
        (user) => {
            if (!user) {
                res.status(401).json({'authorized': false});
            }
            user = user.toJSON();
            for (const role in user.roles) {
                if (user.roles[role].permissions.length != 0) {
                    res.status(200).json({'authorized': true});
                }    
            }
            res.status(401).json({'authorized': false});
        }
    ) 
}