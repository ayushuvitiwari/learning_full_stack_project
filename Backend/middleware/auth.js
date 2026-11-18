
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verify;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: error.message
        });
    }
};

module.exports = auth;
