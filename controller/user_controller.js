const UserModel = require('../model/db');



const getAllUsers = async (req, res) => {
    try {
      
      const users = await UserModel.find().select('-password -refreshToken');
  
      
      res.json(users);
    } catch (error) {
      
      res.status(500).json({ message: error.message });
    }
  };


const getSingleUser = async (req, res) => {
  try {
    
    const {email, id} = req.body;

    
    if (!email && !id) {
      return res.status(400).json({ message: 'Email or ID is required' });
    }

    
    let user;
    if (email) {
      user = await UserModel.findOne({ email }).select('-password -refreshToken');
    } else if (id) {
      user = await UserModel.findById(id).select('-password -refreshToken');
    }
       
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        
        res.json(user);
      } catch (error) {
        
        res.status(500).json({ message: error.message });
      }
    };
    

  
  module.exports = {getAllUsers, getSingleUser}
  


