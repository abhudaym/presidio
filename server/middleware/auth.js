import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authVerify = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.jwtSecret);

            req.user = await User.findById(decoded.id).select("-password");
            console.log(decoded)
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
    next();
}

const adminVerify = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
}

export { authVerify, adminVerify }