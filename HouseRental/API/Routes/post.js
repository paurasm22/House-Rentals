import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPost, deletePost, getPostById, getPosts, getPostsByUser, updatePost } from '../Controllers/post.js';
import { Authenticated } from '../Middlewares/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads')); 
  },
  filename: function (req, file, cb) {
    const userId = req.user._id; 
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${userId}-${timestamp}${ext}`);
  }
});

const upload = multer({ storage: storage });

router.post('/create',Authenticated, upload.array('images'), createPost);

router.get('/getposts', getPosts);

router.get('/getuserpost',Authenticated, getPostsByUser);

router.delete('/delete/:postId', Authenticated, deletePost);

router.put('/update/:postId', Authenticated, upload.array('images', 3), updatePost);

router.get('/getparticularpost/:postId',Authenticated,getPostById)
export default router;
