const {model, Schema} = require('mongoose')


const schema_products = new Schema({
    name : {
        type: String,
        required: [true, 'name is required']
    },          
    status : {
        type: Boolean,
        default: true,
        required: true
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price : {
        type: Number,
        default: 0
    },
    category : {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    description : {type: String},
    avaible : {
        type: Boolean,
        default: true
    }
})

schema_products.methods.toJSON = function () {
    const {__v, _id, status, ...products} = this.toObject()

    products.uid = _id

    return products
}

module.exports = model('Product', schema_products)