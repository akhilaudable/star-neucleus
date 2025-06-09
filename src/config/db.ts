import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async (): Promise<void> => {
    // Validate environment variable
    const mongoDBUrl = process.env.MONGODB_URL;
    if (!mongoDBUrl) {
        console.error('MONGODB_URL is not defined in environment variables');
        process.exit(1);
    }
    try {
        await mongoose.connect(mongoDBUrl);
        console.log('Connected to MongoDB');
    } catch (err: unknown) {
         // Improved error logging
        if (err instanceof Error) {
            console.error(err.message);
        }
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;