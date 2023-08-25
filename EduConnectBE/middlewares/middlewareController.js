const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../config/environment');
const middlewareController = {
    verifyToken: (req, res, next) =>{
        const token = req.headers.token;
        if(token)
        {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, PRIVATE_KEY, (error , user )=>{
                if(error)
                {
                    res.status(403).json("Token in valid");
                }
                req.user = user;
                next();
            })
        }
        else{
            res.status(401).json("You're not authenticated")
        }
    }
}
module.exports = middlewareController