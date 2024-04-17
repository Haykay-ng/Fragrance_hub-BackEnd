import mongoose from 'mongoose';

export const connectdb =(url) =>{
    mongoose
    .connect(url)
    .then(()=>console.log('db connected'))
    .catch(err=>console.log("Error connecting to mongoose", err.message));
}