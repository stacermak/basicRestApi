import { prisma } from "../db.js";

export const createPost = async (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
  
    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          authorId: req.user.userId,
        },
      });
  
      return res.status(201).json(newPost);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  };

  export const getAllPosts = async (req, res) => {
    try {
        const getAllPosts = await prisma.post.findMany()
        return res.status(200).json(getAllPosts)
    } catch (error) {
        res.status(500).json({message: 'Error!'})
    }
}

  export const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                author: true,
            },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching post' });
    }
};

  