
import express from 'express';
import cors from 'cors';
import foodRoutes from './routes/food.routes.js';
import 'dotenv/config'
import connectDB from './config/db.config.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); 

app.use('/api/foods', foodRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
