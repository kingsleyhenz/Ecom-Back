import express from 'express';
import { loggedIn } from '../middleware/loginAccess.js';
import { addToCart, addToWishlist, clearCart, getCart, getTotalAmount, getWishlist, removeFromWishlist, removeItem } from './../controller/cart.js';
import { cancelOrder, checkout, markOrderDelivered } from '../controller/order.js';
import { isBlocked } from './../middleware/accountStatus.js';

const cartRouter = express.Router();

cartRouter.post("/addToCart", loggedIn, isBlocked, addToCart); 

cartRouter.get("/mycart", loggedIn, isBlocked, getCart);

cartRouter.get("/totalPrice", loggedIn, isBlocked, getTotalAmount);

cartRouter.delete("/remove/:cartItemId", loggedIn, isBlocked, removeItem);

cartRouter.delete("/clear-cart", loggedIn, isBlocked, clearCart);

cartRouter.post("/checkout", loggedIn, isBlocked, checkout);

cartRouter.delete("/cancel/:orderId", loggedIn, isBlocked, cancelOrder)

cartRouter.post("/delivery/:orderId", isBlocked, markOrderDelivered);

cartRouter.post("/addwishlist", loggedIn, isBlocked, addToWishlist);

cartRouter.get("/wishlist", loggedIn, isBlocked, getWishlist); 

cartRouter.delete("/remove-list/:productId", loggedIn, isBlocked, removeFromWishlist);





export default cartRouter