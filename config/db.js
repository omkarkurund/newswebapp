import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        mongoose.set('debug', true);
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB database is connected');
    } catch (error) {
        console.error('MongoDB database connection failed');
        console.error(error);
        process.exit(1); // Terminate the process with an error code
    }
};

export default connectDB;
