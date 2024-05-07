require('dotenv').config();
import {
    verifyAccessToken,
    verifyRefreshToken,
    handleRefreshToken
}
    from '../services/JWTServices'

const nonSecurePaths = [
    '/user/logout-user',
    '/user/login-user',
    '/user/register',
    '/user/forgot-password',
    '/car/get-bmw-car',
    '/car/get-ferrari-car',
    '/car/get-lamborghini-car',
]

const checkAccessToken = async (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next()

    let cookies = req.cookies
    if (cookies && cookies.accessToken && cookies.refreshToken) {
        let accessToken = cookies.accessToken
        let accessTokenSignature = process.env.ACCESS_TOKEN_SIGNATURE
        let decodedAccessToken = await verifyAccessToken(accessToken, accessTokenSignature)
        // check access token && expire time
        if (decodedAccessToken && decodedAccessToken !== "ExpiredAccessToken") {
            req.user = decodedAccessToken
            next()
        }
        // if expired access token => refresh token
        if (decodedAccessToken && decodedAccessToken === "ExpiredAccessToken") {
            // use refresh token
            let refreshToken = cookies.refreshToken
            let refreshTokenSignature = process.env.REFRESH_TOKEN_SIGNATURE
            let decodedRefreshToken = await verifyRefreshToken(refreshToken, refreshTokenSignature)
            // check refresh token && expire time
            if (decodedRefreshToken && decodedRefreshToken !== "ExpiredRefreshToken") {
                // create new access token && new refresh token
                let response = await handleRefreshToken(decodedRefreshToken)
                let newAccessToken = response?.data?.newAccessToken
                let newRefreshToken = response?.data?.newRefreshToken

                if (newAccessToken && newRefreshToken) {
                    res.cookie("accessToken", newAccessToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRE_TIME });
                    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRE_TIME });
                    return res.status(405).json({
                        errorCode: 3,
                        errorMessage: "reload to apply new access token",
                        data: ""
                    })
                }
            }
            // if expired refresh token => logout
            if (decodedRefreshToken && decodedRefreshToken === "ExpiredRefreshToken") {
                if (cookies && cookies.accessToken && cookies.refreshToken) {
                    res.clearCookie("accessToken");
                    res.clearCookie("refreshToken");
                    return res.status(401).json({
                        errorCode: 4,
                        errorMessage: "refreshToken is expired, login required",
                        data: ""
                    })
                }
            }
        }
    }
    // don't have cookie or access token or refresh token
    else {
        return res.status(401).json({
            errorCode: 1,
            errorMessage: 'PLease login to continue',
            data: ''
        })
    }
}

export default checkAccessToken