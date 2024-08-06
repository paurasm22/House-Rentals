import mongoose from 'mongoose';
// import { Post } from '../Models/Post.js'
import { Post } from '../Models/Post.js';

import path from 'path';
import multer from 'multer';

export const createPost = async (req, res) => {
  try {
    const { title, roomnos, place, address, landmark, carpetArea, rent, deposit, featuamini, contact } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded', success: false });
    }
    const images = req.files.map(file => `/uploads/${file.filename}`); 

    const post = new Post({
      user: req.user, 
      images,
      roomnos,
      place,
      address,
      landmark,
      carpetArea,
      rent,
      deposit,
      featuamini,
      contact
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.user._id; 
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// update post
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { roomnos, place, address, landmark, carpetArea, rent, deposit, featuamini, contact } =  await req.body;
    
    
     const updates =  {
      roomnos,
      place,
      address,
      landmark,
      carpetArea,
      rent,
      deposit,
      featuamini,
      contact
    };

    console.log('PostId:', postId);
    console.log('Updates:', updates);

    
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await Post.findByIdAndUpdate(postId, updates, { new: true });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error('Update Error:', error); 
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

   
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

  
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get Post Error:', error); 
    res.status(500).json({ message: error.message });
  }
};