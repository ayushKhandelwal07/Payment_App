const  JWT_SECRET  = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ msg: "der missing or incorrect" });
    }

    const token = authHeader.split(' ')[1];
//     console.log(token);

    try {
        const decoded = jwt.verify(token , JWT_SECRET);
      //   console.log(decoded)
        req.userId = decoded.userId;
        next();
    } catch (err) {
            //    
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
