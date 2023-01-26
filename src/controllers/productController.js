const productModel = require('../models/productModel')
const moment = require('moment')

module.exports = {
    
    createProduct : async (req, res) => {
        try {
            let data = req.body
            let {userId, categoryId} = req.params
            data['userId'] = userId, data['categoryId'] = categoryId
            let saveProduct = await productModel.create(data)
            return res.status(201).send({ status: true, msg: "Product created successfully", Product: saveProduct })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    fetchProduct : async (req, res) => {
        try {
            let {page} = req.params
            let findProducts = await productModel.find({isDeleted: false}).populate('categoryId').select({_id:0, categoryName: 1, productName: 1, qtyPerUnit: 1, unitPrice: 1, unitInStock: 1, discontinued : 1}).skip(2*(page-1)).limit(2)
            return res.status(200).send({ status: true, Products: findProducts })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    fetchProductByName : async (req, res) => {
        try {
            let name = ''
            if (req.params.name) {
                name = req.params.name
            }
            let findProduct = await productModel.find({productName: {$regex: '.*'+name+'.*', $options: 'i' }, isDeleted: false}).select({_id:0, categoryName: 1, productName: 1, qtyPerUnit: 1, unitPrice: 1, unitInStock: 1, discontinued : 1})
            if (!findProduct[0]) {
                return res.status(404).send({ status: false, msg: "Produce not found" })
            }
            return res.status(200).send({status: true, Product: findProduct})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    fetchProductById : async (req, res) => {
        try {
            let {productId} = req.params
            let findProducts = await productModel.findOne({_id: productId, isDeleted: false}).populate('categoryId').select({_id:0, categoryName: 1, productName: 1, qtyPerUnit: 1, unitPrice: 1, unitInStock: 1, discontinued : 1})
            return res.status(200).send({ status: true, Products: findProducts })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    updateProduct : async (req, res) => {
        try {
            let {userId,productId} = req.params
            req.body.updatedAt = moment().format("DD-MM-YYYY  h:mm:ss a") 
            let updateData = await productModel.findOneAndUpdate({userId: userId, _id: productId, isDeleted: false},req.body,{new: true}).select({_id: 0, productName: 1, qtyPerUnit: 1, unitPrice: 1, unitInStock: 1, discontinued : 1})
            if (!updateData) {
                return res.status(400).send({ status: false, msg: 'Product not found' })
            }
            return res.status(200).send({ status: true,msg: 'Product updated successfully', Products: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    deleteProduct : async (req, res) => {
        try {
            let {userId,productId} = req.params
            let deleteData = await productModel.findOneAndUpdate({userId: userId, _id: productId, isDeleted: false},{isDeleted: true, deletedAt: moment().format("DD-MM-YYYY  h:mm:ss a") })
            if (!deleteData) {
                return res.status(400).send({ status: false, msg: 'Product not found' })
            }
            return res.status(200).send({ status: true, Products: deleteData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }
}