const {model, Schema} = require('mongoose')


const schema_categories = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },          
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

schema_categories.methods.toJSON = function () {
    const {__v, _id, status, ...categories} = this.toObject()

    categories.uid = _id

    return categories
}

module.exports = model('Categories', schema_categories)