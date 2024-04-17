import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },
        image: {
            type: String,
        },
        imagePublicId: {
            type: String,
        },
        role: {
            type: Number,
            default: 0,
        },
        address: {
            type: Object,
            default:{
                state: "lagos",
                city: 'onipanu',
                street: '1 Ogunlesi street',
                zip: '23401',
                country: 'Nigeria',
                
            }
            
        },
        OTP: {
         type: String,
        }
    },
    { timestamps: true}
)
export default mongoose.model ('User', userSchema)