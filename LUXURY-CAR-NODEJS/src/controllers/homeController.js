import homeServices from '../services/homeServices';

let getHomePage = async (req, res) => {
    let data = await homeServices.getAllUserService();
    return res.render("home.ejs", {
        dataTable: data
    })
}

let getCreateUserPage = (req, res) => {
    return res.render("createUser.ejs")
}

let postNewUser = async (req, res) => {
    let data = req.body
    await homeServices.createNewUserService(data)
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let id = req.query.id
    if (id) {
        await homeServices.deleteUserService(id)
        return res.redirect('/')
    } else {
        return res.send('User not found')
    }
}

let getEditUserPage = async (req, res) => {
    let id = req.query.id
    let user = await homeServices.getUserByIdService(id)
    return res.render('editUser.ejs', {
        user: user
    })
}

let editUser = async (req, res) => {
    let data = req.body
    await homeServices.editUserService(data)
    return res.redirect('/')
}

module.exports = {
    getHomePage: getHomePage,
    getCreateUserPage: getCreateUserPage,
    postNewUser: postNewUser,
    deleteUser: deleteUser,
    getEditUserPage: getEditUserPage,
    editUser: editUser,
}