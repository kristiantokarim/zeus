const db = require('../config/db');

const Permission = new db.Schema(
    {
        action: {
            type: String, 
            required: true
        },
        resource: {
            type: String, 
            required: true
        },
        description : {
            type: String, 
            required: true
        }
    }
)
module.exports = db.model('Permission', Permission);

