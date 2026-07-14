import { Router } from 'express'
import { createUserController, getAllUsersController, searchByEmailLikeController } from '../controllers/user/user.controller'

const router = Router()

router.post('/register', createUserController)
router.get("/", getAllUsersController)
router.get('/search-email', searchByEmailLikeController)

export default router;
