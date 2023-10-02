import path from 'path';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import  dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddelware.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 8120;
connectDB();


const app = express()

//body parser middle ware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(cors());

// respond with "hello world" when a GET request is made to the homepage

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);


app.get('/api/config/paypal',(req,res) => 
res.send({clientId:
process.env.PAYPAL_CLIENT_ID}));

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    //any route that is not api will be redirected to index.html
    app.get('*',(req,res) => 
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html')));
} else {
    app.get('/',(req,res) => {
        res.send('API is running...');
    });
}

app.use(notFound);
app.use(errorHandler);



app.listen(port,()=>console.log(`Server running on port ${port}`));
