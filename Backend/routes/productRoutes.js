import express from "express";
import { getProducts, getProductsById } from "../controllers/productController.js";

const router = express.Router();

await router.route('/').get(getProducts);

await router.route('/:id').get(getProductsById);

export default router;

