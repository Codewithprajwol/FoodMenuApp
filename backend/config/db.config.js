// import mongoose from 'mongoose';
// import 'dotenv/config';

// console.log(process.env.MONGODB_URI);
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;

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
