const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) => {
    try {
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
        const response = await UserService.loginUser(req.body);
        const {refresh_token, ...newreponse} = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(newreponse)
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
        const token = req.cookies.refresh_token
        
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
const logoutUser = (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'Log out successfully'
        })
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
    logoutUser,
}