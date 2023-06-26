import  express  from "express";
import { createProduct, getAllProduct, getByName, getByPrice, getBySubCategory, getProductByCategory } from './../controller/products.js';


const itemRoute = express.Router();

itemRoute.post("/upload-to-sellCart", createProduct);

itemRoute.get("/get-product/:productName", getByName); 

itemRoute.get("/getProducts", getAllProduct);

itemRoute.get("/getCategory/:category", getProductByCategory);

itemRoute.get("/getSubCategory/:SubCategory", getBySubCategory);

itemRoute.get("/filterPrice/:SubCategory/:minprice/:maxprice", getByPrice);

export default itemRoute