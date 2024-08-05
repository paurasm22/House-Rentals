import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPost, deletePost, getPostById, getPosts, getPostsByUser, updatePost } from '../Controllers/post.js';
import { Authenticated } from '../Middlewares/auth.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads')); // Corrected path
  },
  filename: function (req, file, cb) {
    const userId = req.user._id; // Example: User ID from the request body
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${userId}-${timestamp}${ext}`);
  }
});

const upload = multer({ storage: storage });

// Route to create a post with file upload
router.post('/create',Authenticated, upload.array('images'), createPost);

// Route to get all posts
router.get('/getposts', getPosts);

// get posts of a particular user
router.get('/getuserpost',Authenticated, getPostsByUser);

//route to delete a post 
router.delete('/delete/:postId', Authenticated, deletePost);

// Route to update a post
router.put('/update/:postId', Authenticated, upload.array('images', 3), updatePost);

// get a particular post by id
router.get('/getparticularpost/:postId',Authenticated,getPostById)
export default router;
