const categoryModel = require('../models/categoryModel')
const productModel = require('../models/productModel')
const moment = require('moment')

module.exports = {

    createCategory : async (req, res) => {
        try {
            let {userId} = req.params
            req.body.userId = userId
            let saveData = await categoryModel.create(req.body)
            return res.status(201).send({status: true, msg: 'Category created successfully', Category: saveData})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    fetchCategory : async (req, res) => {
        try {
            let fetchData = await categoryModel.find().select({_id:0, __v: 0})
            return res.status(200).send({status: true, Category: fetchData})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    updateCategory : async (req, res) => {
        try {
            let {userId, categoryId} = req.params
            let {categoryName} = req.body
            let updateData = await categoryModel.findOneAndUpdate({userId: userId, _id: categoryId, isDeleted: false},{categoryName: categoryName, updatedAt: moment().format("DD-MM-YYYY  h:mm:ss a") },{new: true}).select({_id:0, __v: 0})
            if (!updateData) {
                return res.status(404).send({ status: false, msg: "Product not found" })
            }
            return res.status(200).send({status: true, msg: 'Category updated successfully', Category: updateData})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },
    
    deleteCategory : async (req, res) => {
        try {
            let {userId, categoryId} = req.params
            await categoryModel.findOneAndUpdate({userId: userId, _id: categoryId, isDeleted: false},{isDeleted: true, deletedAt: moment().format("DD-MM-YYYY  h:mm:ss a") })
            await productModel.findOneAndUpdate({categoryId: categoryId,isDeleted: false},{isDeleted: true, deletedAt: moment().format("DD-MM-YYYY  h:mm:ss a")})
            return res.status(200).send({status: true, msg: 'Category deleted successfully'})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },
    
}