const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided'});
    }
    const parts = authHeader.split(' ');
    console.log(authHeader);

    if (!parts.length === 2) 
        return res.status(401).send({ error: "Token error"});
    
    const scheme = parts[0];
    const token = parts[1];

    console.log(scheme);
    console.log(parts);

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: "Token malformated"});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: "Token invalid", err});
        console.log(err);
        req.userId = decoded.id;
        return next();
    });

    
   
};