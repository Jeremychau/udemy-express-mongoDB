import { randomUUID } from 'crypto';
import HttpError from '../models/http-error.js';
import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator'

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Kobe Bryant',
        email: 'kobe@gmail.com',
        password: '1234'
    }
]

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};

const signup = (req, res, next) => {
    console.log(req);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid input.')
    }
    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find( user => user.email === email );

    if(hasUser) throw new HttpError('Wrong User', 422)

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser)

    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find( user => user.email === email );

    if(!identifiedUser || identifiedUser.password !== password) throw new HttpError('Wrong User', 401)

    res.json({message: 'Logged In'});
};

export { getUsers, signup, login }