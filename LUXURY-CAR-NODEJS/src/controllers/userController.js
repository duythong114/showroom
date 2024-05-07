require('dotenv').config();
import userServices from '../services/userServices';

let handleLoginUser = async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        if (email && password) {
            let response = await userServices.loginUser(email, password)

            if (response.status === 200) {
                res.cookie("accessToken", response.data.accessToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRE_TIME });
                res.cookie("refreshToken", response.data.refreshToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRE_TIME });
            }

            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing email or password",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleRegisterUser = async (req, res) => {
    try {
        let data = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            groupId: req.body.groupId
        }

        if (data) {
            let arrInput = [data.email, data.password, data.firstName, data.lastName, data.address, data.phoneNumber, data.gender, data.groupId]
            let arrInputName = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId']
            for (let i = 0; i < arrInput.length; i++) {
                if (!arrInput[i]) {
                    return res.status(400).json({
                        errorCode: 3,
                        errorMessage: `Missing parameter ${arrInputName[i]}`,
                        data: ""
                    })
                }
            }

            let response = await userServices.registerUser(data)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleGetAllUsers = async (req, res) => {
    try {
        let { page, limit } = req.query

        // check if pagination 
        if (page && limit) {
            let paginationUsers = await userServices.paginationUserList(+page, +limit)
            return res.status(paginationUsers.status).json({
                errorCode: paginationUsers.errorCode,
                errorMessage: paginationUsers.errorMessage,
                data: paginationUsers.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameters",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleGetUserById = async (req, res) => {
    try {
        // let id = req.params.id
        let id = req.query.id

        if (id) {
            let user = await userServices.getUserById(id)
            return res.status(user.status).json({
                errorCode: user.errorCode,
                errorMessage: user.errorMessage,
                data: user.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleCreateUser = async (req, res) => {
    try {
        let data = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            groupId: req.body.groupId
        }

        if (data) {
            let response = await userServices.createUser(data)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleDeleteUser = async (req, res) => {
    try {
        let userId = req.body.userId

        if (userId) {
            let response = await userServices.deleteUser(userId)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleUpdateUser = async (req, res) => {
    try {
        let data = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            // groupId: req.body.groupId
        }

        if (data) {
            let response = await userServices.updateUser(data)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleGetUserRefresh = async (req, res) => {
    try {
        if (req.user) {
            let userId = req.user?.userId

            if (userId) {
                let response = await userServices.refreshUser(userId)

                return res.status(response.status).json({
                    errorCode: response.errorCode,
                    errorMessage: response.errorMessage,
                    data: response.data
                })
            } else {
                return res.status(401).json({
                    errorCode: 3,
                    errorMessage: 'Please login to continue',
                    data: ""
                })
            }
        } else {
            return res.status(401).json({
                errorCode: 2,
                errorMessage: 'Please login to continue',
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleLogoutUser = async (req, res) => {
    try {
        let cookies = req.cookies
        if (cookies && cookies.accessToken && cookies.refreshToken) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({
                errorCode: 0,
                errorMessage: "Logout successfully",
                data: ""
            })
        } else {
            return res.status(404).json({
                errorCode: 2,
                errorMessage: `Don't have user to logout`,
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleUpdatePersonalUser = async (req, res) => {
    try {
        let data = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            // groupId: req.body.groupId
        }

        if (data) {
            let response = await userServices.updatePersonalUser(data)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleChangePassword = async (req, res) => {
    try {
        let data = {
            userId: req.body.userId,
            password: req.body.password,
            newPassword: req.body.newPassword,
        }

        if (data) {
            let response = await userServices.changePassword(data)

            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required paramater",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleForgotPassword = async (req, res) => {
    try {
        let email = req.body.email

        if (email) {
            let response = await userServices.forgotPassword(email)

            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required paramater",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

module.exports = {
    handleLoginUser: handleLoginUser,
    handleRegisterUser: handleRegisterUser,
    handleGetAllUsers: handleGetAllUsers,
    handleGetUserById: handleGetUserById,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
    handleGetUserRefresh: handleGetUserRefresh,
    handleLogoutUser: handleLogoutUser,
    handleUpdatePersonalUser: handleUpdatePersonalUser,
    handleChangePassword: handleChangePassword,
    handleForgotPassword: handleForgotPassword,
}