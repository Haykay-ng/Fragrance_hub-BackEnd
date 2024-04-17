import {connectdb} from "./src/db.config.js";
import dotenv from "dotenv"
import  express from "express"
import authRouter from './src/routes/auth.js';
import categoryRouter from './src/routes/category.js';
import productRouter from './src/routes/product.js';
import orderRouter from './src/routes/order.js';

// import islogin from "./src/controllers/auth.js"
dotenv.config()

// initialize express server
const app = express ()
app.use(express.json())

const port = process.env.PORT 
const dbUrl = process.env.MONGODB_URI

// console.log(port);
// console.log(dbUrl);

// connect to DB
connectdb(dbUrl)

// app.get ('/', (req,res) =>{
//     res.json({success:true, message: "ok"})

// })
 // Routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter)



// app.get("/login", login)

app.listen(port,(req, res) =>{
    console.log(`Fragrance Hub Server Listen on port ${port}`);
})


console.log("start server");