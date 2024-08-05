import express from 'express'
import {deleteuser, getLikedPosts, likePost, login, profile, register, unlikePost, updatePassword} from "../Controllers/user.js"
import { Authenticated } from '../Middlewares/auth.js'

const Router =express.Router()

Router.post('/register',register)
Router.post('/login',login)
Router.delete('/deleteuser',Authenticated,deleteuser)
Router.put('/updatepassword',Authenticated,updatePassword)
Router.get('/profile',Authenticated,profile)

// Like a post (requires authentication)
Router.post('/like', Authenticated, likePost);

// Unlike a post (requires authentication)
Router.post('/unlike', Authenticated, unlikePost);

// Get all liked posts (requires authentication)
Router.get('/likedposts', Authenticated, getLikedPosts);
export default Router;