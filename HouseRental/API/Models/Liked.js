// // models/Liked.js
// import mongoose from 'mongoose';

// const likedSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   postId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Post',
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export const Liked = mongoose.model('Liked', likedSchema);
