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

/*

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
    cookieSession({
      name: "google-auth",
      keys: ["key1", "key2"],
    })
  );

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  };

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());


// app.get("/",(req,res)=>{
//     res.send(" <a link  ")
// });

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get("/home",isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(`Welcome mr ${req.user.displayName}!`);
});

// Auth Routes
app.get( "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
  
app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    function (req, res) {
        // Successful authentication, redirect home.
       res.redirect("/home");
    }
);


*/


connectDB();
const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`The server started at http://localhost:${PORT}`)
});



