const jwt = require('jsonwebtoken');

// so what it's going to take it's going to take the if from then database
// the user id and its going to return it in form of the encrypted token
// jwt dot sign its take to the id and its going to talk something called kwt secret
// and we're going to set on wht number of days the token is going to be expired
const generateToken = (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"1d",
    })
}

module.exports = generateToken; 