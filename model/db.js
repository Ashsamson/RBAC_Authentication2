const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  email: {type: String, unique: true, lowercase: true},
  password: {type: String}, 
  user_name: {type: String, unique: true, lowercase: true},
  first_name: {type: String},
  last_name: {type: String},
  role: { type: String, enum: ['admin', 'shipper', 'carrier', 'user' ] },
  ACCESSTOKEN: String,
  REFRESHTOKEN: String 
},
{
  timestamps: true
});





module.exports = mongoose.model('users', userSchema);

