const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalRefreshToken, generalAccessToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password, confirmPassword } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
            if (!email || !password || !confirmPassword) {
                resolve({
                    status: 'error',
                    message: 'The input is required',
                })
            } else if (checkUser !== null) {
                resolve({
                    status: 'error',
                    message: 'The email is already',
                });
            } else if (!isCheckEmail) {
                resolve({
                    status: 'error',
                    message: 'The input is email',
                })
            } else if (password !== confirmPassword) {
                resolve({
                    status: 'error',
                    message: 'Passwords do not match',
                })
            }
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                email,
                password: hash,
            });

            if (createdUser) {
                resolve({
                    status: "OK",
                    message: 'Successfully created',
                    data: createdUser
                });
            }

        }
        catch (error) {
            reject(error);
        }
    });
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
            const checkUser = await User.findOne({
                email: email,
            })
            if (!email || !password) {
                resolve({
                    status: 'error',
                    message: 'The input is required'
                })
            } else if (!isCheckEmail) {
                resolve({
                    status: 'error',
                    message: 'The input is email'
                })
            } else if (checkUser === null) {
                resolve({
                    status: 'error',
                    message: 'The user is not defined',
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'error',
                    message: 'The password or user is incorrect',
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })

        }
        catch (error) {
            reject(error)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            });
                resolve({
                    status: 'error',
                    message: 'The user is not defined',
                })
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser
            })

        }
        catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            });
            if (checkUser === null) {
                resolve({
                    status: 'error',
                    message: 'The user is not defined',
                })
            }
            await User.findByIdAndDelete(id);
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

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allUser
            })

        }
        catch (error) {
            reject(error)
        }
    })
}

const getUserDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            });
            if (user === null) {
                resolve({
                    status: 'error',
                    message: 'The user is not defined',
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })

        }
        catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUserDetail,

}