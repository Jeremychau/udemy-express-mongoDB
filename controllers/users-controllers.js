import HttpError from '../models/http-error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator'
import 'dotenv/config'

import User from '../models/user.js';

const getUsers = async(req, res, next) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (err) {
        const error = new HttpError( 'Get Users Fail', 500 )
        return next(error)
    }
};

const signup = async (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const [error] = errors.array();
        next( new HttpError(`${error.param}  Invalid input.`) );
    }

    let hashedPassword;
    let isExistingUser;
    let token;

    const { name, email, password, places } = req.body;

    try {
        isExistingUser = await User.findOne( {email} )
        if(isExistingUser){
            const error = new HttpError( 'User exists already, please login.', 422 )
            return next(error)
        }
    } catch (err) {
        const error = new HttpError( 'Sign Up User Fail', 500 )
        return next(error)
    }

    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (error) {
        console.log(error);
    }

    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        image: req.file.path,
        places
    })

    try {
        await createdUser.save();
        token = jwt.sign({userId: createdUser._id, email: createdUser.email}, process.env.jwt, {expiresIn: '365 days'});
    } catch (err) {
        const error = new HttpError( 'Sign Up User Fail', 500 )
        return next(error)
    }

    res.status(201).json({userId: createdUser._id, userEmail: createdUser.email, token: token });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let token;
    let isValidPassword = false;
    let isExistingUser;

    try {
        isExistingUser = await User.findOne( {email} )

        if(!isExistingUser){
            const error = new HttpError( 'Invalid User', 401 )
            return next(error)
        }
    } catch (err) {
        const error = new HttpError( 'Login Fail', 500 )
        return next(error)
    }

    try {
        isValidPassword = await bcrypt.compare(password, isExistingUser.password);
        token = jwt.sign({userId: isExistingUser._id, email: isExistingUser.email}, process.env.jwt, {expiresIn: '365 days'});

        if(!isValidPassword) throw error()
    } catch (err) {
        const error = new HttpError( 'Password not match', 500 )
        return next(error)
    }

    if(isValidPassword) res.json({message: 'Logged In', user: isExistingUser._id, email:isExistingUser.email, token});
};

export { getUsers, signup, login }