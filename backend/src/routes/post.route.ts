import { Router } from 'express'
import * as PostController from '../controllers/post/post.controller'
import { createPostSchema } from '../dtos/post.dto';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router()

router.post('/posts', validate(createPostSchema), PostController.createPostController)
router.get('/posts', PostController.getAllPostsController)
router.get('/posts/:idPost', PostController.getPostByIdController)
router.delete('/posts/:idPost', PostController.deletePostController)
router.patch('/posts/:idPost', PostController.updatePostController)


export default router;
