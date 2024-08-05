import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './Routes/user.js';
import postRouter from './Routes/post.js'; 
import path from 'path';

const port = 1000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

// Routes
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);


// Serve static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

mongoose.connect("mongodb+srv://paurasmore22:mbeH5cGNjSL6O7bO@homerental.pu2txol.mongodb.net/", {
  dbName: "Homerental"
}).then(() => {
  console.log("Connected Successfully!");
}).catch(err => {
  console.error("Connection error", err);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
