import slugify from "slugify";
import Category from "../models/category.js";


export const  createCategory = async (req, res ) =>{
    try {
        const { name} = req.body
        if(!name) {
            return res.status(400).json( "Name is required");
        }

        const existingCategory = await Category.findOne ({ name})

        if (existingCategory) {
            return res.status(400).json({successs: false, message: "Category already exists"});
        }

        const category = await new Category({name, slug:slugify(name)}).save()

        res.json({successs: true, message: "Category created successfully", category});
        
    } catch (err) {
        console.log(err);
        res.json({successs: false, message: "Internal Server Error", errMsg: err.message});
        
    }
}