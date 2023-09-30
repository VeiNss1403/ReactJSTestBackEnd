const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) => {
    try {
        console.log(req.body);
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
const loginUser = async (req, res) => {
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
        const response = await UserService.loginUser(req.body);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getUserDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await UserService.getUserDetail(userId);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        if (!token) {
            return res.status(200).json({
                status: 'error',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshToken(token);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUserDetail,
    refreshToken,
}