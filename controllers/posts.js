import { prisma } from "../db.js";

export const getAllPosts = async (req, res) => {
    try {
        const getAllPosts = await prisma.post.findMany()
        return res.status(200).json(getAllPosts)
    } catch (error) {
        res.status(500).json({message: 'Error!'})
    }
}