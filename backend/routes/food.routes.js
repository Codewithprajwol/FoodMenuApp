import express from 'express';
import { addFood, deleteFood, editFood, getAllFoods, getSingleProduct } from '../controller/food.controller.js';
const router = express.Router();

router.get('/', getAllFoods);
router.post('/', addFood);
router.put('/:id', editFood);
router.delete('/:id', deleteFood);
router.get('/singleItem/:id',getSingleProduct);

export default router;
