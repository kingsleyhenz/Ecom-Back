import  express  from "express";
import { createProduct, getAllProduct, getByName, getByPrice, getBySubCategory, getProductByCategory} from './../controller/products.js';
import { loggedIn } from './../middleware/loginAccess.js';
import { payWPaystack, payWithStripe } from "../controller/payment.js";


const itemRoute = express.Router();

itemRoute.post("/upload-to-sellCart", createProduct);

itemRoute.get("/get-product/:productName", getByName); 

itemRoute.get("/getProducts", getAllProduct);

itemRoute.get("/getCategory/:category", getProductByCategory);

itemRoute.get("/getSubCategory/:SubCategory", getBySubCategory);

itemRoute.get("/filterPrice/:SubCategory/:minprice/:maxprice", getByPrice);

itemRoute.post("/pay/:productId", loggedIn, payWithStripe);

itemRoute.post("/paystack", loggedIn , payWPaystack);

export default itemRoute