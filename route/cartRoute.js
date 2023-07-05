import express from 'express';
import { loggedIn } from '../middleware/loginAccess.js';
import { addToCart, clearCart, getCart, getTotalAmount, removeItem } from './../controller/cart.js';
import { checkout } from '../controller/order.js';

const cartRouter = express.Router();

cartRouter.post("/addToCart", loggedIn, addToCart); 

cartRouter.get("/mycart", loggedIn, getCart);

cartRouter.get("/totalPrice", loggedIn, getTotalAmount);

cartRouter.delete("/remove/:productId", loggedIn, removeItem);

cartRouter.delete("/clear-cart", loggedIn, clearCart);

cartRouter.post("/checkout", loggedIn, checkout)


export default cartRouter