import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI= process.env.MONGO_URI;

const connectDB = async ()=>{

    try {
        const connection= await mongoose.connect(MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true 
        });
        console.log(`MongoDB is Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;