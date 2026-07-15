import { Router } from 'express'
import * as PostController from '../controllers/post/post.controller'
import { createPostSchema } from '../dtos/post.dto';
import { validate } from '../middleware/validation.middleware';

const router = Router()

router.post('/:idUser/posts', validate(createPostSchema), PostController.createPostController)
router.get('/:idUser/posts', PostController.getAllPostsController)


export default router;
