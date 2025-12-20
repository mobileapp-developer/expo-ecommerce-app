import mongoose from "mongoose";
import {ENV} from "./env.js";

/* Connect to MongoDB */
export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(ENV.DB_URL);
        console.log(`✅ Connection to MongoBD: ${connection.connection.host}`);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB")
        process.exit(1);
    }
}