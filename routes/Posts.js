const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const Post = require('../model/Post');

// Get all the posts
router.get('/', async (req, res) => {
  try {
  // find() -> get all the data
  const posts = await Post.find();
  res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});


// Save a post
router.post('/', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
  
});

// Get a specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update the specific post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      {_id : req.params.postId},
      {$set : {
        title: req.body.title,
    description: req.body.description,
      },
    }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

  // Delete a post
  router.delete('/:postId', async (req, res) => {
    try {
      const removePost = await Post.deleteOne({ _id: req.params.postId });
      res.json(removePost);
    } catch (err) {
      res.json({ message: err });
    }
  });



module.exports = router;