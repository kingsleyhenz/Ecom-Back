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

