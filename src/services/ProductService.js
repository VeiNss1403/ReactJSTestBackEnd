const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      discount,
      miniType,
      forPerson,
      brand,
      country,
      ingredient,
      miniImages,
    } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already",
        });
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        countInStock: Number(countInStock),
        price,
        rating,
        description,
        discount: Number(discount),
        miniType,
        forPerson,
        brand,
        country,
        ingredient,
        countRating: 0,
        miniImages: miniImages || [],
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = async (limit, page, sort, filter) => {
  try {
    const query = filter
      ? { [filter[0]]: { $regex: filter[1], $options: "i" } }
      : {};
    const objectSort = sort ? sort : { createdAt: -1, updatedAt: -1 };

    const allProduct = await Product.find(query)
      .sort(objectSort)
      .limit(limit)
      .skip(page * limit);
    const countProduct = await Product.find(query).countDocuments();
    const response = {
      status: "OK",
      message: "Success",
      data: allProduct,
      total: countProduct,
      pageCurrent: Number(page + 1),
    };

    return response;
  } catch (error) {
    throw error;
  }
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllBrand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allBrand = await Product.distinct("brand");
      resolve({
        status: "OK",
        message: "Success",
        data: allBrand,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllForPerson = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allForPerson = await Product.distinct("forPerson");
      resolve({
        status: "OK",
        message: "Success",
        data: allForPerson,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllMiniType = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const miniTypes = await Product.find({ type: type }).distinct("miniType");
      resolve({
        status: "OK",
        message: "Success",
        data: miniTypes,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
  getAllMiniType,
  getAllBrand,
  getAllForPerson,
};
