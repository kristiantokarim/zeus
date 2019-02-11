const db = require('../config/db');
const bcrypt = require('../config/bcrypt');

const User = new db.Schema(
    {
        name: {
            type: String, 
            required: true
        },
        username: {
            type: String, 
            required: true
        },
        password: {
            type: String, 
            required: true
        },
        roles : [
            {
                type: db.Schema.Types.ObjectId,
                ref: 'Role'
            }
        ]
    }
)

User.methods.addRole = function(role_id) {
    if (role_id === undefined) {
        throw new Error('Null role id');
    }
    if (this.roles.indexOf(role_id) == -1) {
        this.roles.push(role_id);
    } else {
        throw new Error('Role already exists');
    }
};

User.methods.removeRole = function(role_id) {
    if (!role_id) {
        throw new Error('Null role_id id');
    }
    const indexOfRole = this.role.indexOf(role_id);
    if (indexOfRole != -1) {
        this.roles.splice(indexOfRole,1);
    } else {
        throw new Error('Role not found');
    }
}

User.statics.authenticate = function(username, password, callback) {
    this.findOne({username : username}).then(
        (user) => {
            if (!user) {
                callback(undefined);
            }
            bcrypt.compare(password, user.password).then(
                (authenticated) => {
                    if (authenticated) {
                        user = user.toObject();
                        delete user.password;
                        callback(user);
                    } else {
                        callback(undefined);
                    }
                }
            )
        }    
    ).catch(
        (error) => {
            console.log(error);
            callback(undefined);
        }
    )
}

module.exports = db.model('User', User);

