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

export const getProductByCategory = async(req,res)=>{
    const { category } = req.params;
    try {
        const products = await Product.find({category});
        if(!products){
            res.json({
                status: "Error",
                message: "Category Does Not Exist"
            });
        }
        res.json({
            status: "success",
            data: products
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            status: "error",
            message: "error.message"
        })
    }
}

export const getBySubCategory = async(req,res)=>{
    const {SubCategory} = req.params;
    try {
        const subCate = await Product.find({SubCategory})
        if(!subCate){
            res.json({
                status: "Error",
                message: "This Category does not exist"
            })
        }
        res.json({
            status: "Success",
            data: subCate
        })
    } catch (error) {
        
    }
}