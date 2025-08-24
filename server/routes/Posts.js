const express = require("express");
const router = express.Router();
const { Posts, Likes, Dislikes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Path to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique name for the file
  },
});

const upload = multer({ storage: storage });

// GET all posts (including Likes and Dislikes)
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes, Dislikes] });
  res.json(listOfPosts);
});

// Get liked and disliked posts for the logged-in user
router.get("/reacts", validateToken, async (req, res) => {
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  const dislikedPosts = await Dislikes.findAll({
    where: { UserId: req.user.id },
  });

  res.json({ likedPosts, dislikedPosts });
});

// GET a single post by ID
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

// GET similar posts (same author and similar content)
router.get("/similar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const currentPost = await Posts.findByPk(id);
    
    if (!currentPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Get posts from the same author (excluding current post)
    const sameAuthorPosts = await Posts.findAll({
      where: {
        UserId: currentPost.UserId,
        id: { [Op.ne]: id } // Exclude current post
      },
      include: [Likes, Dislikes],
      limit: 3,
      order: [['createdAt', 'DESC']]
    });

    // If we have enough posts from the same author, return them
    if (sameAuthorPosts.length >= 3) {
      return res.json(sameAuthorPosts.slice(0, 4));
    }

    // Get recent posts from other authors as fallback
    const recentPosts = await Posts.findAll({
      where: {
        id: { [Op.ne]: id } // Exclude current post
      },
      include: [Likes, Dislikes],
      limit: 4,
      order: [['createdAt', 'DESC']]
    });

    // Combine same author posts with recent posts
    const allPosts = [...sameAuthorPosts, ...recentPosts];
    const uniquePosts = allPosts.filter((post, index, self) => 
      index === self.findIndex(p => p.id === post.id)
    );

    // Limit to 4 posts total
    const finalPosts = uniquePosts.slice(0, 4);

    res.json(finalPosts);
  } catch (error) {
    console.error("Error fetching similar posts:", error);
    res.status(500).json({ error: "Failed to fetch similar posts" });
  }
});

// GET posts by UserId
router.get("/byUserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes, Dislikes],
  });
  res.json(listOfPosts);
});

// POST a new post with optional image upload
router.post("/", validateToken, upload.single("image"), async (req, res) => {
  try {
    const post = req.body;

    // If an image is uploaded, save its path
    if (req.file) {
      post.imageUrl = `/uploads/${req.file.filename}`;
    }

    post.username = req.user.username;
    post.UserId = req.user.id;

    const newPost = await Posts.create(post);
    res.json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    
    if (error.name === 'SequelizeDatabaseError' && error.parent?.code === 'ER_DATA_TOO_LONG') {
      res.status(400).json({ 
        error: "Content too long", 
        message: "The post content is too long. Please try shortening your content." 
      });
    } else if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ 
        error: "Validation error", 
        message: "Please check your input data." 
      });
    } else {
      res.status(500).json({ 
        error: "Server error", 
        message: "Failed to create post. Please try again." 
      });
    }
  }
});

// Update post title
router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
});

// Update post text
router.put("/postText", validateToken, async (req, res) => {
  const { newPostText, id } = req.body;
  await Posts.update({ postText: newPostText }, { where: { id: id } });
  res.json(newPostText);
});

// Update full post (title, content, and image)
router.put("/:id", validateToken, upload.single("image"), async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, postText } = req.body;
    
    // Check if user owns this post
    const existingPost = await Posts.findByPk(postId);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    if (existingPost.UserId !== req.user.id) {
      return res.status(403).json({ error: "You can only edit your own posts" });
    }
    
    // Prepare update data
    const updateData = {
      title: title,
      postText: postText
    };
    
    // If an image is uploaded, save its path
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // Update the post
    await Posts.update(updateData, { where: { id: postId } });
    
    // Return the updated post
    const updatedPost = await Posts.findByPk(postId);
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    
    if (error.name === 'SequelizeDatabaseError' && error.parent?.code === 'ER_DATA_TOO_LONG') {
      res.status(400).json({ 
        error: "Content too long", 
        message: "The post content is too long. Please try shortening your content." 
      });
    } else if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ 
        error: "Validation error", 
        message: "Please check your input data." 
      });
    } else {
      res.status(500).json({ 
        error: "Server error", 
        message: "Failed to update post. Please try again." 
      });
    }
  }
});

// DELETE a post
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("Post Deleted Successfully");
});

module.exports = router;
