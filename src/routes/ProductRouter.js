const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/create', ProductController.createProduct);
router.put('/update/:id',authMiddleware, ProductController.updateProduct);
router.delete('/delete/:id',authMiddleware, ProductController.deleteProduct);
router.get('/getAllProduct', ProductController.getAllProduct);
router.get('/get-detail/:id', ProductController.getDetail);
router.post('/delete-many',authMiddleware, ProductController.deleteManyProduct);

module.exports = router;