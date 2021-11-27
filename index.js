import express from 'express';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import './helpers/passport-google.js';

import connectDB from './connection/db.js';

import googleAuth from './routes/authentication.js';
import passport from 'passport';

dotenv.config();

const app= express();

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[process.env.cookie_key_secret_1,process.env.cookie_key_secret_2]
}));

// initialize passport for cookie-session
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

app.use('/auth',googleAuth);
app.use("/",(req,res)=>res.send("<a href=auth/google>Sign in </a> "));



connectDB();
const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`The server started at http://localhost:${PORT}`)
});



