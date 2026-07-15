import { Router } from 'express'
import * as UserController from '../controllers/user/user.controller'

const router = Router()

router.post('/register', UserController.createUserController)
router.get("/", UserController.getAllUsersController)
router.get('/search-email', UserController.searchByEmailLikeController)

export default router;
