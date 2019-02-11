const Role = require('../models/Role');

module.exports.create = (req, res, next) => {
    role = new Role(req.body);
    role.save().then(
        (result) => {
            res.status(200).json({'message': 'Insert role successfully'});
        }
    ).catch(
        (error) => {
            res.status(400).json({'message': error});
        }
    );
}

module.exports.addPermission = (req, res, next) => {
    query = Role.findById(req.body.role_id);
    query.exec().then(
        (role) => {
            try {
                role.addPermission(req.body.permission_id);
            } catch (error) {
                res.status(400).json({'message': error.message});    
            }

            role.save().then(
                (result) => {
                    res.status(200).json({'message': 'Permission added successfully'});
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
        query = Role.findById(req.params.id).populate('permissions');
        key = true;
    } else {
        query = Role.find({}).populate('permissions');
        key = false;
    }
    query.exec().then(
        (role) => {
            if (key) {
                res.status(200).json( { role : role});
            } else {

                res.status(200).json( { roles : role});
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