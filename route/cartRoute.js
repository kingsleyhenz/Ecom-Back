import express from 'express';
import { loggedIn } from '../middleware/loginAccess.js';
import { addToCart, addToWishlist, clearCart, getCart, getTotalAmount, getWishlist, removeFromWishlist, removeItem } from './../controller/cart.js';
import { cancelOrder, checkout, markOrderDelivered } from '../controller/order.js';

const cartRouter = express.Router();

cartRouter.post("/addToCart", loggedIn, addToCart); 

cartRouter.get("/mycart", loggedIn, getCart);

cartRouter.get("/totalPrice", loggedIn, getTotalAmount);

cartRouter.delete("/remove/:productId", loggedIn, removeItem);

cartRouter.delete("/clear-cart", loggedIn, clearCart);

cartRouter.post("/checkout", loggedIn, checkout);

cartRouter.delete("/cancel/:orderId", loggedIn, cancelOrder)

cartRouter.post("/delivery/:orderId", markOrderDelivered);

cartRouter.post("/addwishlist", loggedIn, addToWishlist);

cartRouter.get("/wishlist", loggedIn, getWishlist); 

cartRouter.delete("/remove-list/:productId", loggedIn, removeFromWishlist);





export default cartRouter