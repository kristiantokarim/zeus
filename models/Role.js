const db = require('../config/db');
const Role = new db.Schema(
    {
        name: {
            type: String, 
            required: [true, "Role name is required"],
            unique: true
        },
        description : {
            type: String, 
            required: [true, "Role description is required"]
        },
        permissions : [
            { type: db.Schema.Types.ObjectId, ref: 'Permission' }
        ]
    }
)

Role.methods.addPermission = function(permission_id) {
    if (permission_id === undefined) {
        throw new Error('Null permission id');
    }
    if (this.permissions.indexOf(permission_id) == -1) {
        this.permissions.push(permission_id);
    } else {
        throw new Error('Permission already exists');
    }
};

Role.methods.removePermission = function(permission_id) {
    if (!permission_id) {
        throw new Error('Null permission id');
    }
    const indexOfPermission = this.permissions.indexOf(permission_id);
    if (indexOfPermission != -1) {
        this.permissions.splice(indexOfPermission,1);
    } else {
        throw new Error('Permission not found');
    }
}

module.exports = db.model('Role', Role);
