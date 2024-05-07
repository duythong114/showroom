const nonSecurePaths = [
    '/user/logout-user',
    '/user/login-user',
    '/user/register',
    '/user/forgot-password',
    '/car/get-bmw-car',
    '/car/get-ferrari-car',
    '/car/get-lamborghini-car',
]

const checkAuthorization = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/user/get-user-refresh') return next()

    if (req.user) {
        let currentPath = req.path
        let roles = req.user?.roles
        if (roles) {
            let checkRoles = roles.some(item => item.url === currentPath)
            if (checkRoles) {
                next()
            } else {
                return res.status(403).json({
                    errorCode: 3,
                    errorMessage: `The user don't have permission`,
                    data: ''
                })
            }
        } else {
            return res.status(401).json({
                errorCode: 2,
                errorMessage: 'PLease login to continue',
                data: ''
            })
        }
    } else {
        return res.status(401).json({
            errorCode: 1,
            errorMessage: 'PLease login to continue',
            data: ''
        })
    }
}

export default checkAuthorization