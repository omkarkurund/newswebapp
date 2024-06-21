import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';

import connectDB from "./config/db.js";
import { errorResponseHandler, invalidPathHandler } from "./middleware/errorHandler.js";
// Routes
import userRoutes from './routes/userRoutes.js'
import newsRoutes from './routes/newsRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import newsCategoriesRoutes from './routes/NewsCategoriesRoutes.js'


// Load environment variables from .env file
dotenv.config();



const corsOptions = {
    origin: true,
};





const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

// Define a route for the root URL
app.get("/", (req, res) => {
    // Connect to the database
    res.send("Server is running...");
});



app.use('/api/users',userRoutes);
app.use('/api/news',newsRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/news-categories',newsCategoriesRoutes);


// static assets
// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))



app.use(invalidPathHandler);
app.use(errorResponseHandler);

// Start the server
app.listen(port, () => {
    connectDB();
    console.log(`Listening on port ${port}`);
});
