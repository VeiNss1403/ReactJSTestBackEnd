const UserService = require('../services/UserService');

const createProduct = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).jason({
                status: 'error',
                message: 'The input is required',
            })
        } else if (!isCheckEmail) {
            return res.status(200).jason({
                status: 'error',
                message: 'The input is email',
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'error',
                message: 'Passwords do not match'
            })
        }
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createProduct
}