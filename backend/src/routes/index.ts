import { Router } from 'express'
import authRouter from './auth.route.js'
import artigoRouter from './artigo.route.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/artigos', artigoRouter)

export default router