const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                });
            }
            const newProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            });
            if (newProduct) {
                resolve({
                    status: "OK",
                    message: 'Successfully created',
                    data: newProduct
                });
            }

        }
        catch (error) {
            reject(error);
        }
    });
}
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            });
            if (checkProduct === null) {
                resolve({
                    status: 'error',
                    message: 'The product is not defined',
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateProduct
            })

        }
        catch (error) {
            reject(error)
        }
    })
}
const getDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            });
            if (product === null) {
                resolve({
                    status: 'error',
                    message: 'The product is not defined',
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })

        }
        catch (error) {
            reject(error)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            });
            if (checkProduct === null) {
                resolve({
                    status: 'error',
                    message: 'The product is not defined',
                })
            }
            await Product.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'Delete user SUCCESS',
            })

        }
        catch (error) {
            reject(error)
        }
    })
}
const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany( );
            resolve({
                status: 'OK',
                message: 'Delete user SUCCESS',
            })

        }
        catch (error) {
            reject(error)
        }
    })
}
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProducts = await Product.count()
            if (filter) {
                const label = filter[0];
                const allProductFilter = await Product.find({
                    [label]: { '$regex': filter[1] },
                }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProductFilter,
                    total: totalProducts,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProducts / limit)
                })
            }
            if (sort) {
                const objectsSort = {}
                objectsSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectsSort)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProductSort,
                    total: totalProducts,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProducts / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page * limit).sort({
                name: sort
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                total: totalProducts,
                pageCurrent: Number(page + 1),
                totalPages: Math.ceil(totalProducts / limit)
            })

        }
        catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetail,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
}