import Product from "../models/Products.js";

export const createProduct = async(req,res) =>{
    const {category, SubCategory, Model, price, description, imageUrl} = req.body;
    try {
        const newproduct = await Product.create({
            category,
            SubCategory,
            Model,  
            price,
            description,
            imageUrl
        })
        res.json({
            status: 201,
            data: newproduct,
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: "Error",
            message: error.message
        })
    }
}

export const getAllProduct = async(req,res)=>{
    try {
        const product = await Product.find({});
        res.json({
            status: "OK",
            data: product
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            status: error,
            message: error.message,
        });
    }
} 

