const ensureAuthentication = (req, res, next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json(
            {message: "Unauthorized, JWT token is require"});
    }
    try{
        const decoded = JsonWebTokenError.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(403)
        .json({message: "unauthorized, JWT token wrong or expired"});

    }
}

module.exports = ensureAuthentication;