const HttpError = require("./http-error");
const adminmodel =    require("../model/admin");

const authenticationfirst = async (req,res,next)=>{
   
    const tokenUserId = req.userData;
    let existingUser;
    try{
        existingUser = await adminmodel.findById(tokenUserId);
   }catch(err)
   {
       return next(new HttpError("Authorization failed",402));
   };
   if(!existingUser)
   {
       return next(new HttpError("Authorization failed",402));
   }

   req.existingUser = existingUser;

   next();

}

module.exports = authenticationfirst;