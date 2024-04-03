import express from "express"

import { getAllPosts } from "../controllers/posts.js"

const router = express.Router();

router.get("/getAllPosts", getAllPosts)


export default router;