import express from 'express';
import { loggedIn } from '../middleware/loginAccess.js';
import { addToCart, getCart } from './../controller/cart.js';

const cartRouter = express.Router();

cartRouter.post("/addToCart/:productId", loggedIn, addToCart); 

cartRouter.get("/mycart", loggedIn, getCart);


export default cartRouter