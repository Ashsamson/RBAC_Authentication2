require("dotenv").config()
//const RateLimiter = require('express-rate-limit');

const PORT =  process.env.PORT || 5000
const VERSION =  process.env.VERSION
const ACCESSTOKEN =  process.env.ACCESSTOKEN
const REFRESHTOKEN =  process.env.REFRESHTOKEN
const db = process.env.DB_URL;

// Set up rate limiting
// const limiter = RateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   });

module.exports= {
    PORT,
    VERSION,
    ACCESSTOKEN,
    REFRESHTOKEN,
    db

}