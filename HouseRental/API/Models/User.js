import mongoose from 'mongoose'

const userSchema  = new mongoose.Schema({
  name:{type:String,require:true},
  email:{type:String,require:true},
  password:{type:String,require:true},
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  createdAt:{type:Date,default:Date.now},
  // admin:{type:Boolean,default:false}

})

export const User = mongoose.model("User",userSchema)