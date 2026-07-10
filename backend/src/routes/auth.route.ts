import { Router } from 'express'
import { signUpUser } from '../controllers/user/signUp.js'
import { signInUser } from '../controllers/user/signIn.js'

const router = Router()

router.post('/register', signUpUser)
router.post('/login', signInUser)

export default router;