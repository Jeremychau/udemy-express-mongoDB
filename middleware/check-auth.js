import HttpError from "../models/http-error.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) throw new Error('Wrong authorization');

        let decodedToken = jwt.verify(token, process.env.jwt);
        req.userData = {userId: decodedToken.userId, email:decodedToken.email };
        next();
    } catch (err) {
        const error = new HttpError('Wrong authorization', 401);
        return next(error);
    }
};
