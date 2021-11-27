import express from 'express';
import passport from 'passport';

const router=express.Router();

// auth with google
router.get('/google',passport.authenticate('google',{ scope:['profile','email'] }) );

// callback route for google and serialize will happen

router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
    res.send('You have reached the callback URI');
})

export default router;