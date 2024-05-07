import express from 'express';
// import { getHomePage } from '../controller/homeController';
import homeController from '../controllers/homeController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/create-user', homeController.getCreateUserPage)
    router.post('/post-user', homeController.postNewUser)
    router.get('/delete-user', homeController.deleteUser)
    router.get('/edit-user', homeController.getEditUserPage)
    router.post('/put-user', homeController.editUser)

    return app.use("/", router);
}

export default initWebRoutes;