import db from '../models/index';

let getRoleByGroupId = (groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (groupId) {
                let roles = await db.Role.findAll({
                    attributes: ['url', 'description'],
                    include: { model: db.Group, where: { id: groupId }, attributes: ['name'], through: { attributes: [] } },
                    raw: true,
                    nest: true
                })
                if (roles) {
                    resolve(roles)
                } else {
                    resolve({})
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

export default getRoleByGroupId