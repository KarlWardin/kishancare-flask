import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();


// we are sending cookie to browser
passport.serializeUser((user,done)=>{
  
  //  we are sending user as a cookie to browser 
  
  // null means no error
  done(null,user);
})

// we are getting the cookie from browser
passport.deserializeUser((user,done)=>{
  
  // null means no error
  console.log(user);
  done(null,user);
})



passport.use(  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken,refreshToken,profile,done)=>{
        // passport callback function
        
        // null means no error call serializeUser and send profile as argument
        done(null,profile);
    })
)