import express from 'express'
  import { createGrocery, deleteGrocery, getGrocery, updateGrocery } from '../controller/grocery.controller.js';
const router = express.Router();


router.get('/', getGrocery)

router.post('/', createGrocery)

router.patch('/:id',updateGrocery)

router.delete('/:id',deleteGrocery)

export default router