const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authsmiddleware');
const {authRegister, authLogin, authlogout } = require('../utils/auths');
const {getAllUsers, getSingleUser} = require('../controller/user_controller');






// route to register new users
router.post("/Register", authRegister);

//route to Authentication and login 
router.post('/login', authLogin);

//route to logout user
router.get('/logout', authlogout);

router.get('/', getAllUsers)

router.get('/user', getSingleUser)





//role based authorization *admin  only
router.get('/login/admin', authenticate, authorize(['admin']),(req,res)=>{
    return res.status(200).json({msg: 'Thank you being an admin..only admin can access this API!'})   
});
  
//role based authorization *shippers only 
router.get('/login/shipper', authenticate, authorize(['admin', 'shipper']),(req,res)=>{
    return res.status(200).json({msg: 'only admins and shippers can access this API!'})   
});
  
//role based authorization carriers, 
router.get('/login/carrier', authenticate, authorize(['admin', 'shipper','carrier']),(req,res)=>{
    return res.status(200).json({msg: ' this is a general API for admins, shippers and carries only'})   
});
  
//role based authorization members only 
router.get('/login/member', authenticate, authorize(['admin', 'shipper','carrier','member']),(req,res)=>{
    return res.status(200).json({msg: ' Thank you for being a member of our company..! This is a general APi for all Users!!(i.e for all roles)'})   
});

// router.post("/refresh-token", async(req, res,) => {
//     try{
//         const refreshToken = req.body;
//         if (!refreshToken){
//             return res.status(401).json({msg: 'refresh token not found!'});
//         }
//         const userRefreshToken = await userRefreshToken.findOne({refreshToken, userId : decodedRefreshToken.uderId});
//         const decodedRefreshToken = jwt.verify(refreshToken, config.refreshTokenSecret);

//         if (!userRefreshToken){
//             return res.status(401).json({msg: "refresh token invalid or expired!"})  
//         }

//         //
//          await userRefreshToken.remove({_id: userRefreshToken._id})
//          await userRefreshToken.compactDatafile()

//     }catch(error){
//         if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError){
//             return res.status(401).json({msg: "refresh token invalid or expired!"})
//         }
//         return res.status(500).json({msg : error.msg});
//     };
// });


module.exports= router