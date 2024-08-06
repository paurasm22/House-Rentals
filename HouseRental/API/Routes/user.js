import express from 'express'
import {deleteuser, getLikedPosts, likePost, login, profile, register, unlikePost, updatePassword} from "../Controllers/user.js"
import { Authenticated } from '../Middlewares/auth.js'

const Router =express.Router()

Router.post('/register',register)
Router.post('/login',login)
Router.delete('/deleteuser',Authenticated,deleteuser)
Router.put('/updatepassword',Authenticated,updatePassword)
Router.get('/profile',Authenticated,profile)

Router.post('/like', Authenticated, likePost);

Router.post('/unlike', Authenticated, unlikePost);

Router.get('/likedposts', Authenticated, getLikedPosts);
export default Router;