import { Router } from 'express'
import * as PostController from '../controllers/post/post.controller'
import { createPostSchema } from '../dtos/post.dto';
import { validate } from '../middleware/validation.middleware';

const router = Router()

router.post('/:idUser/posts', validate(createPostSchema), PostController.createPostController)
router.get('/:idUser/posts', PostController.getAllPostsController)
router.delete('/:idUser/posts/:idPost', PostController.deletePostController)
router.patch('/:idUser/posts/:idPost', PostController.updatePostController)


export default router;
