import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },    
  image:{
    type: String,
    required: true,
    trim: true,
  },
  price:{
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem; 