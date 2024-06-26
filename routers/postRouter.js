import {Router} from 'express';
import { filterPrice, getPosts, searchPosts } from '../controllers/postController.js';

const postRouter = Router()

postRouter.get('/posts', getPosts)
postRouter.get('/search-posts', searchPosts)
postRouter.get('/filter-price', filterPrice)

export default postRouter