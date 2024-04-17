import mongoose from "mongoose";
const { Schema } =  mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 32,
            unique: true,
        },
        slug: {
            type: "string",
            unique: true,
            lowercase:true,
        }
        
       
       
    },
    // { timestamps: true }
);

export default mongoose.model('Category', categorySchema)