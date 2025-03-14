const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userModel = require('../model/db')


//authentication function
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token not found' });
    }

    const accessToken = authHeader.split(' ')[1];
    const decodedAccessToken = jwt.verify(accessToken, config.ACCESSTOKEN);

    const user = await userModel.findById(decodedAccessToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    req.userId = decodedAccessToken.userId;
    req.role = decodedAccessToken.role;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token has expired' });
    }
return res.status(401).json({ message: 'Invalid access token' });
}
};

 //authorization function
const authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      const userRole = req.role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};



module.exports = { authenticate, authorize };
