import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { Post } from "../Models/Post.js";
 export const register = async(req,res)=>{
  const {name,email,password}  = req.body;
  try {
    let user = await User.findOne({email})
    if (user){
      res.json({message:"User Already Exists please Login",sucess:false})
    }
    else{
      const hashPass =await bcrypt.hash(password,10) 
      user = await User.create({name,email,password:hashPass})
      res.json({message:"User registered Sucessfully",sucess:true})
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}


export const login=async(req,res)=>{
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email})
    if (!user) return res.json({message:"User not found !",success:false})
      const validpassword=await bcrypt.compare(password,user.password)
    if (!validpassword)return res.json({message:"Invalid Credentials",success:false})

      const token = jwt.sign({userId:user._id},"@#$$##%%",{
        expiresIn:'365d'
      })
      res.json({message:`Matched Credentials ${user.name}`,token,
        sucess:true})
  } catch (error) {
    res.json({message:error.message})
  }
}

export const deleteuser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found!", success: false });
    }

    await User.deleteOne({ email });
    res.json({ message: "User deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const updatePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found!", success: false });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.json({ message: "Current password is incorrect!", success: false });
    }

    const hashPass = await bcrypt.hash(newPassword, 10);
    user.password = hashPass;
    await user.save();

    res.json({ message: "Password updated successfully", success: true });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const profile = async (req,res)=>{
  res.json({user:req.user})
}


// Add a post to user's liked posts
export const likePost = async (req, res) => {
  const { postId } = req.body; // ID of the post to like
  try {
    const user = await User.findById(req.user._id); // Use req.user to get the current user
    if (!user) return res.json({ message: "User not found", success: false });

    const post = await Post.findById(postId);
    if (!post) return res.json({ message: "Post not found", success: false });

    // Add postId to user's likedPosts array if it's not already there
    if (!user.likedPosts.includes(postId)) {
      user.likedPosts.push(postId);
      await user.save();
      res.json({ message: "Post liked successfully", success: true });
    } else {
      res.json({ message: "Post already liked", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Remove a post from user's liked posts
export const unlikePost = async (req, res) => {
  const { postId } = req.body; // ID of the post to unlike
  try {
    const user = await User.findById(req.user._id); // Use req.user to get the current user
    if (!user) return res.json({ message: "User not found", success: false });

    // Remove postId from user's likedPosts array
    user.likedPosts = user.likedPosts.filter(id => id.toString() !== postId);
    await user.save();
    res.json({ message: "Post unliked successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get all liked posts of the user
export const getLikedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('likedPosts'); // Populate to get post details
    if (!user) return res.json({ message: "User not found", success: false });

    res.json({ likedPosts: user.likedPosts, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};