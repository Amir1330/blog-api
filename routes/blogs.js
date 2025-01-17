const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Create a new blog post
router.post('/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all blog posts
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve a single blog post by its ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send();
    }
    res.status(200).send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a blog post by its ID
router.put('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) {
      return res.status(404).send();
    }
    res.status(200).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a blog post by its ID
router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send();
    }
    res.status(200).send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
