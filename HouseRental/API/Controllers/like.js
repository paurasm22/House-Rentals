// // controllers/likedController.js
// import { Liked } from '../Models/Liked.js'
// import { Post } from '../models/Post.js';
// import { User } from '../Models/User.js'
// // Add a like
// export const likePost = async (req, res) => {
//   const { postId } = req.body;
//   const userId = req.user._id;

//   try {
//     // Check if the post exists
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     // Check if the like already exists
//     const existingLike = await Liked.findOne({ userId, postId });
//     if (existingLike) return res.status(400).json({ message: 'Post already liked' });

//     // Create a new like
//     const like = new Liked({ userId, postId });
//     await like.save();

//     res.status(201).json({ message: 'Post liked successfully', like });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const getLikedPosts = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     // Find all liked posts for the user
//     const likes = await Liked.find({ userId }).populate('postId');
//     const likedPosts = likes.map(like => like.postId);

//     res.json({ likedPosts });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const unlikePost = async (req, res) => {
//   const { postId } = req.params;
//   const userId = req.user._id;

//   try {
//     // Remove the like
//     const result = await Liked.deleteOne({ userId, postId });
//     if (result.deletedCount === 0) return res.status(404).json({ message: 'Like not found' });

//     res.json({ message: 'Like removed successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };