import mongoose from 'mongoose';
import 'dotenv/config';

 const connectDB=async()=>{
   try {
    const conn=await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected successfully",conn.connection.host);
    
   } catch (error) {
    console.log('error while connecting database',error)
    process.exit(1);
   }
}

export default connectDB;
