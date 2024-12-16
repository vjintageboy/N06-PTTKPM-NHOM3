const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied" });

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    };
};

module.exports = authMiddleware;
