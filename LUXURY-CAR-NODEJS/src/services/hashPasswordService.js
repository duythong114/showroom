import bcrypt from "bcryptjs";

let hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);

    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

export default hashUserPassword