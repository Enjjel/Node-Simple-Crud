const {model, Schema} = require('mongoose')


const roles_schema = new Schema({
    name: {
        type: String,
        required:true
    }
})

module.exports = model('Role', roles_schema)