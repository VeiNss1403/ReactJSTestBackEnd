const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body;

        if (!name || !image || !type || !price || !countInStock || !rating || !description) {
            return res.status(200).jason({
                status: 'error',
                message: 'The input is required',
            })
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'error',
                message: 'The product is required'
            })
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getDetail = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await ProductService.getDetail(productId);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(Number(limit || 8), Number(page || 0), sort, filter);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetail,
    deleteProduct,
    getAllProduct,
}