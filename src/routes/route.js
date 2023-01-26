const express = require("express")
const router = express.Router()

const {createUser, login, fetchUserById, updateUser} = require('../controllers/userController')
const {createCategory, fetchCategory, updateCategory, deleteCategory} = require('../controllers/categoryController')
const {createProduct, fetchProduct, fetchProductByName, fetchProductById, updateProduct, deleteProduct} = require('../controllers/productController')
const {authentication, authorization} = require('../middlewares/auth')

router.post('/createUser', createUser)
router.post('/login', login)
router.get('/fetchUserById/:userId', authentication, fetchUserById)
router.put('/updateUser/:userId', authentication, authorization, updateUser)

router.post('/createCategory/:userId', authentication,createCategory)
router.get('/fetchCategory', authentication, fetchCategory)
router.put('/user/:userId/updateCategory/:categoryId', authentication, authorization, updateCategory)
router.delete('/user/:userId/deleteCategory/:categoryId', authentication, authorization, deleteCategory)

router.post('/user/:userId/createProduct/:categoryId', authentication, authorization, createProduct)
router.get('/fetchProduct/:page', authentication, fetchProduct)
router.get('/fetchProductByName/:name', authentication, fetchProductByName)
router.get('/fetchProduct/:productId', authentication, fetchProductById)
router.put('/user/:userId/updateProduct/:productId', authentication, authorization, updateProduct)
router.delete('/user/:userId/deleteProduct/:productId', authentication, authorization, deleteProduct)

router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router