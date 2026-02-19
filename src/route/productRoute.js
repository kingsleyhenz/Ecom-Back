import  express  from "express";
import { createProduct, getAllCategories, getAllProduct, getByName, getByPrice, getBySubCategory, getProductByCategory} from './../controller/products.js';
import { loggedIn } from './../middleware/loginAccess.js';
import { isBlocked } from "../middleware/accountStatus.js";
// import { payWithStripe, payWPaystack } from './../controller/payment.js';



const itemRoute = express.Router();



itemRoute.get("/get-product/:productName", getByName); 

itemRoute.get("/allCats", getAllCategories);

itemRoute.get("/getCategory/:category", getProductByCategory); 

itemRoute.get("/getSubCategory/:SubCategory", getBySubCategory);

itemRoute.get("/filterPrice/:SubCategory/:minprice/:maxprice", getByPrice);

// itemRoute.post("/pay", loggedIn, payWPaystack); 


export default itemRoute