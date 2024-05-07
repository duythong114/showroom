require('dotenv').config();
import jwt from 'jsonwebtoken';
import db from '../models/index';
import getRoleByGroupId from './getRoleByGroupService'

let createAccessToken = (payload, signature, expireTime) => {
    let token = null
    try {
        token = jwt.sign(payload, signature, { expiresIn: expireTime })
    } catch (error) {
        console.log(error)
    }
    return token
}

let verifyAccessToken = (token, signature) => {
    let decoded = null
    try {
        decoded = jwt.verify(token, signature)
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            decoded = "ExpiredAccessToken"
        }
        console.log(error)
    }

    return decoded
}

let createRefreshToken = (payload, signature, expireTime) => {
    let token = null
    try {
        token = jwt.sign(payload, signature, { expiresIn: expireTime })
    } catch (error) {
        console.log(error)
    }
    return token
}

let verifyRefreshToken = (token, signature) => {
    let decoded = null

    try {
        decoded = jwt.verify(token, signature)
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            decoded = "ExpiredRefreshToken"
        }
        console.log(error)
    }

    return decoded
}

let handleRefreshToken = (decodedRefreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userId = decodedRefreshToken.userId
            if (userId) {
                let user = await db.User.findOne({
                    where: { id: userId },
                    attributes: ['id', 'groupId'],
                    raw: true
                })
                if (user) {
                    // get roles of user by group
                    let groupId = user.groupId
                    let roles = await getRoleByGroupId(groupId)

                    // create new access token
                    let accessTokenPayload = {
                        userId: user.id,
                        roles: roles
                    }
                    let accessTokenSignature = process.env.ACCESS_TOKEN_SIGNATURE
                    let accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRE_TIME

                    let newAccessToken = await createAccessToken(accessTokenPayload, accessTokenSignature, accessTokenExpireTime)

                    // create new refresh token
                    let refreshTokenPayload = {
                        userId: user.id
                    }
                    let refreshTokenSignature = process.env.REFRESH_TOKEN_SIGNATURE
                    let refreshTokenExpireTime = process.env.REFRESH_TOKEN_EXPIRE_TIME

                    let newRefreshToken = await createRefreshToken(refreshTokenPayload, refreshTokenSignature, refreshTokenExpireTime)

                    resolve({
                        errorCode: 0,
                        errorMessage: "Refresh alltoken successfully",
                        data: {
                            newAccessToken: newAccessToken,
                            newRefreshToken: newRefreshToken
                        }
                    })

                } else {
                    resolve({
                        errorCode: 2,
                        errorMessage: "User not found",
                        data: ""
                    })
                }
            } else {
                resolve({
                    errorCode: 1,
                    errorMessage: "Invalid refresh token",
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createAccessToken: createAccessToken,
    verifyAccessToken: verifyAccessToken,
    createRefreshToken: createRefreshToken,
    verifyRefreshToken: verifyRefreshToken,
    handleRefreshToken: handleRefreshToken,
}