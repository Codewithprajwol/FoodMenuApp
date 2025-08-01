import FoodItem from "../model/foodItem.model.js";


export const getAllFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addFood = async (req, res) => {
   
  try {
    const { name, price, image } = req.body;
    if(!name || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const food = new FoodItem({ name, price, image });
    const savedFood = await food.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getSingleProduct = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'item not found' });
    }
    res.json(food);
  } catch (error) {
      
  }
}

export const deleteFood = async (req, res) => {
    try {
        const food = await FoodItem.findByIdAndDelete(req.params.id);
        if (!food) {
        return res.status(404).json({ message: 'Food not found' });
        }
        res.json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

export const editFood = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const { id } = req.params;
    if (!name || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const updatedFood = await FoodItem.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true, runValidators: true }
    );
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};