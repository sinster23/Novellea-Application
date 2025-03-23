import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "You are not authorized" });
        }
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "You are not authorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "Token is invalid" });
        }
        req.user = user;
        next();

    } catch (err) {
        console.log("Error in auth middleware", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default protectRoute;
