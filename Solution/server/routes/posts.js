import express from 'express';

import { getPosts, getPostComments, getPostInfo, getPostsBySearch, getUserPosts, createPost, commentPost, updatePost, likePost, deletePost, getRecommendedPosts } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id/getPostComments', getPostComments);
router.get('/:id', getPostInfo);
router.get('/:id/recommended', getRecommendedPosts);
router.get('/:id/userPosts', getUserPosts);
router.post('/', auth, createPost);
router.post('/:id/commentPost', auth, commentPost);
router.patch('/:id/like', auth, likePost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


export default router;