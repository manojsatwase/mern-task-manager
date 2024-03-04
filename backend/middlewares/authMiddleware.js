const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// whenever user logs in we going to put this protect function before this 
// getNotes function api so what going to happend is user has to pass through 
// this middleware to reach this api and when it passes through this middleware 
// what going to happen it's going to have three parameters 
// request response and next and then its checking from our request
// that is user sending his authorization header over here so going to check headers for authorization
// if it's present and if the authorization has a token which starts with Bearer 
//because as you might know we are sending our bearer token from our frentend

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        //decodes token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                                                         // -password we don't get password
        req.user = await User.findById(decoded.id).select("-password");
  
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });
  
  module.exports =  { protect };