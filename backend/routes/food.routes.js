import express from 'express';
import { addFood, deleteFood, editFood, getAllFoods} from '../controller/food.controller.js';
const router = express.Router();

router.get('/', getAllFoods);
router.post('/', addFood);
router.put('/:id', editFood);
router.delete('/:id', deleteFood);

export default router;
