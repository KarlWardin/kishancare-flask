import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connection/db.js';

dotenv.config();

const app= express();




app.get("/",(req,res)=>res.send("hello"));


connectDB();

const PORT= process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`The server started at http://localhost:${PORT}`)
});



