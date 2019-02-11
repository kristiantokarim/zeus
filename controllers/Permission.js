const Permission = require('../models/Permission');

module.exports.create = (req, res, next) => {
    permission = new Permission(req.body);
    permission.save().then(
        (result) => {
            res.status(200).json({'message': 'Insert permission successfully'});
        }
    ).catch(
        (error) => {
            res.status(400).json({'message': error});
        }
    );
}

module.exports.get = (req, res, next) => {
    if (req.params.id) {
        query = Permission.findById(req.params.id);
        key = true;
    } else {
        query = Permission.find({});
        key = false;
    }
    query.exec().then(
        (permission) => {
            if (key) {
                res.status(200).json( { permission : permission});
            } else {

                res.status(200).json( { permissions : permission});
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

