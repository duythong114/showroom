require('dotenv').config();
import db from '../models/index';
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from './JWTServices'
import hashUserPassword from './hashPasswordService';
import getRoleByGroupId from './getRoleByGroupService'
import { sendNewPasswordEmail } from './sendEmailServices'

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkUserEmail(email)
            if (isEmailExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
                    include: { model: db.Group, attributes: ['name', 'description'] },
                    nest: true,
                    raw: true
                })
                if (user) {
                    let checkPassword = bcrypt.compareSync(password, user.password)
                    if (checkPassword) {
                        delete user.password

                        // get roles of user by group
                        let groupId = user.groupId
                        let roles = await getRoleByGroupId(groupId)

                        // create access token
                        let accessTokenPayload = {
                            userId: user.id,
                            roles: roles
                        }
                        let accessTokenSignature = process.env.ACCESS_TOKEN_SIGNATURE
                        let accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRE_TIME

                        let accessToken = await createAccessToken(accessTokenPayload, accessTokenSignature, accessTokenExpireTime)

                        // create refresh token
                        let refreshTokenPayload = {
                            userId: user.id
                        }
                        let refreshTokenSignature = process.env.REFRESH_TOKEN_SIGNATURE
                        let refreshTokenExpireTime = process.env.REFRESH_TOKEN_EXPIRE_TIME

                        let refreshToken = await createRefreshToken(refreshTokenPayload, refreshTokenSignature, refreshTokenExpireTime)

                        // data return to client
                        let data = {
                            user: user,
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }

                        resolve({
                            status: 200,
                            errorCode: 0,
                            errorMessage: 'Login successfully',
                            data: data
                        })
                    } else {
                        resolve({
                            status: 400,
                            errorCode: 3,
                            errorMessage: 'Your password is incorrect',
                            data: ""
                        })
                    }
                }
            } else {
                resolve({
                    status: 404,
                    errorCode: 2,
                    errorMessage: "User not found",
                    data: ""
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkUserEmail(data.email)
            if (!isEmailExist) {
                let hashPassword = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    groupId: data.groupId,
                })
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Create a new user successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 400,
                    errorCode: 4,
                    errorMessage: 'Your email is already existed, Pls try another email',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'groupId'],
                raw: true
            })
            resolve({
                status: 200,
                errorCode: 0,
                errorMessage: 'Get all users successfully',
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
                include: { model: db.Group, attributes: ['name', 'description'] },
                nest: true,
                raw: true
            })
            if (user) {
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Get user successfully',
                    data: user
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: 'User not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let arrInput = [data.email, data.password, data.firstName, data.lastName, data.address, data.phoneNumber, data.gender, data.groupId]
            let arrInputName = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId']
            for (let i = 0; i < arrInput.length; i++) {
                if (!arrInput[i]) {
                    resolve({
                        status: 400,
                        errorCode: 3,
                        errorMessage: `Missing parameter ${arrInputName[i]}`,
                        data: ""
                    })
                }
            }

            let isEmailExist = await checkUserEmail(data.email)
            if (!isEmailExist) {
                let hashPassword = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    groupId: data.groupId,
                })
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Create a new user successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 400,
                    errorCode: 4,
                    errorMessage: 'Your email is already existed, Pls try another email',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender'],
                include: { model: db.Group, attributes: ['name', 'description'] },
                nest: true,
            })
            if (user) {
                let groupName = user?.Group?.name
                if (groupName === 'manager') {
                    resolve({
                        status: 400,
                        errorCode: 4,
                        errorMessage: `Can't delete manager user`,
                        data: ""
                    })
                } else {
                    user.destroy()

                    resolve({
                        status: 200,
                        errorCode: 0,
                        errorMessage: 'User deleted successfully',
                        data: ""
                    })
                }
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: 'User not found',
                    data: ""
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    status: 400,
                    errorCode: 3,
                    errorMessage: 'Missing required parameter',
                    data: ""
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                attributes: ['id', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
                include: { model: db.Group, attributes: ['name', 'description'] },
                nest: true,
            })

            if (user) {
                let groupName = user?.Group?.name
                if (groupName === 'manager') {
                    resolve({
                        status: 400,
                        errorCode: 5,
                        errorMessage: `Can't update manager user`,
                        data: ""
                    })
                } else {
                    user.firstName = data.firstName
                    user.lastName = data.lastName
                    user.address = data.address
                    user.phoneNumber = data.phoneNumber
                    user.gender = data.gender
                    // user.groupId = data.groupId

                    await user.save()

                    resolve({
                        status: 200,
                        errorCode: 0,
                        errorMessage: 'Update user successfully',
                        data: ""
                    })
                }
            } else {
                resolve({
                    status: 404,
                    errorCode: 4,
                    errorMessage: 'User not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let paginationUserList = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offSet = (page - 1) * limit

            const { count, rows } = await db.User.findAndCountAll({
                order: [
                    ['id', 'ASC'],
                ],
                attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
                include: { model: db.Group, attributes: ['name', 'description'] },
                nest: true,
                raw: true,
                offset: offSet,
                limit: limit,
            });

            if (count && rows) {
                let totalPages = Math.ceil(count / limit)

                let data = {
                    totalPages: totalPages,
                    users: rows
                }

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: "fetch users with pagination successfully",
                    data: data,
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let refreshUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
                include: { model: db.Group, attributes: ['name', 'description'] },
                nest: true,
                raw: true
            })
            if (user) {
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Refresh user information successfully',
                    data: {
                        user: user,
                        isAuthenticated: true
                    }
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 4,
                    errorMessage: 'User not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updatePersonalUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    status: 400,
                    errorCode: 3,
                    errorMessage: 'Missing required parameter',
                    data: ""
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                attributes: ['id', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
                // include: { model: db.Group, attributes: ['name', 'description'] },
                nest: true,
            })

            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.phoneNumber = data.phoneNumber
                user.gender = data.gender
                // user.groupId = data.groupId

                await user.save()

                let newUser = await db.User.findOne({
                    where: { id: data.id },
                    attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
                    include: { model: db.Group, attributes: ['name', 'description'] },
                    nest: true,
                    raw: true
                })
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Update personal successfully',
                    data: newUser,
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 4,
                    errorMessage: 'User not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let changePassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId) {
                resolve({
                    status: 400,
                    errorCode: 3,
                    errorMessage: 'Missing required parameter',
                    data: ""
                })
            }

            let user = await db.User.findOne({
                where: { id: data.userId },
                attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
            })
            if (user) {
                if (data.password) {
                    let checkPassword = bcrypt.compareSync(data?.password, user.password)
                    if (checkPassword) {
                        let hashPassword = await hashUserPassword(data?.newPassword)
                        user.password = hashPassword

                        await user.save()

                        resolve({
                            status: 200,
                            errorCode: 0,
                            errorMessage: 'Change password successfully',
                            data: ""
                        })
                    } else {
                        resolve({
                            status: 400,
                            errorCode: 6,
                            errorMessage: 'Your password is incorrect',
                            data: ""
                        })
                    }
                } else {
                    resolve({
                        status: 400,
                        errorCode: 5,
                        errorMessage: 'Missing password',
                        data: ""
                    })
                }
            } else {
                resolve({
                    status: 404,
                    errorCode: 4,
                    errorMessage: "User not found",
                    data: ""
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let forgotPassword = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
                attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId'],
            })
            if (user) {
                // create random password
                let randomPassword = (Math.random() + 1).toString(36).substring(7);

                // send email
                await sendNewPasswordEmail(email, randomPassword)

                // hash password
                let hashPassword = await hashUserPassword(randomPassword)
                user.password = hashPassword

                await user.save()

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'New password is sent to your email address',
                    data: ""
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: 'Email not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    loginUser: loginUser,
    registerUser: registerUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    paginationUserList: paginationUserList,
    refreshUser: refreshUser,
    updatePersonalUser: updatePersonalUser,
    changePassword: changePassword,
    forgotPassword: forgotPassword,
}

