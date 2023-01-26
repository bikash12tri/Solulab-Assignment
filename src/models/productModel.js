const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const moment = require('moment')

const productSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    categoryId : {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    productName : {
        type: String,
        required: true
    },
    qtyPerUnit : {
        type: Number,
        required: true
    },
    unitPrice : {
        type: Number,
        required: true
    },
    unitInStock : {
        type: Number,
        required: true
    },
    discontinued :  {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: moment().format("DD-MM-YYYY  h:mm:ss a") 
    },
    updatedAt: {
        type: String,
        default: null
    },
    deletedAt: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Product', productSchema) 
