import express from "express"

import { getAllPosts, createPost, getPostById } from "../controllers/posts.js"

import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router();

router.post('/posts', authenticateToken, createPost);
router.get("/posts", getAllPosts)
router.get("/post/:id", getPostById)


export default router;