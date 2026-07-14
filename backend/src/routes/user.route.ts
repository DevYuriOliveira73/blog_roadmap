import { Router } from 'express'
import { createUserController, getAllUsersController } from '../controllers/user/user.controller'

const router = Router()

router.post('/register', createUserController)
router.get("/", getAllUsersController)

export default router;
