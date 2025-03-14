const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const UserModel = require('../model/db');
const statusCode = require('../utils/statusCodes')


// Generate a cryptographically secure salt value
const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);



//function to register 
const authRegister = async(req, res) =>{
  try{
 const {first_name, last_name, email, user_name, password, role} = req.body
 
 if (!user_name ||  !email || !password || !last_name || !first_name){
   return res.status(statusCode).json({msg: 'please fill in all fields'})
 } 
 const existingUser = await UserModel.findOne({ $or: [{user_name}, {email}]});
 if (existingUser){
  return res.status(400).json({msg: 'user already registered'})
 };
 //password hashing
 const hashedPassword = await bcrypt.hash(password, salt);
 //save users registration data
  const user = await UserModel.create({
   first_name,
   last_name,
   email,
   user_name,
   password: hashedPassword,
   role: role ?? 'user'
  });
  res.status(201).json({
    msg: ` Dear ${first_name} your account has been created successfully!`,
     data: user
   }); 

  }catch(error){
   return res.status(500).json({msg : error.msg})
  };
 }


//login functions
const authLogin = async (req, res) => {
  try {
    const { user_name , password } = req.body;
    const user = await UserModel.findOne({ user_name });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
    // Generate access token
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, config.ACCESSTOKEN, {
      expiresIn: '1d',
      subject: 'accessApi'
    });
    // Generate refresh token
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, config.REFRESHTOKEN, {
      expiresIn: '1w',
      subject: 'refreshToken'
    });
    // Store refresh token securely in the database
    await UserModel.updateOne(
      { _id: user._id },
       { $set: { refreshToken } }
      );
    res.json({ 
      userId: user._id,
      accessToken,
       msg: `login succesful, welcome back dear User`
       });
  } catch (error) {
     res.status(500).json({ msg: error.msg });
   }
};


//WORK IN PROGRESS
const authlogout = async (req, res) => {
  try {
    
    const token = req.body.accessToken;

    
    const user = await UserModel.findOne({ token });

    
    if (user) {
      user.token = null;
      await user.save();
    }

    // Return a success message
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {authRegister, authLogin, authlogout};
