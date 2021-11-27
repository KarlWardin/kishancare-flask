import User from "../models/User.js";

const isLogin=async (req,res,next)=>{

    if( !req.user ){
        res.redirect('/auth/google');
    }
    
    else{
        
        try {
            const user=await User.findById(req.user.id);
            if( user ){
                req.user={

                    id: user._id,
                    username:user.username,
                    googleEmail:user.googleEmail,
                    photo:user.photo,
                    googleID:user.googleID,
                    admin: user.admin,
                }
                next();
            }
            else
              res.redirect('/auth/google');
        } catch (error) {
            console.log(error);
            res.redirect('/auth/google');
        }

        
    }
}

export default isLogin;