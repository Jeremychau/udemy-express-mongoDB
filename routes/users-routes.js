import express from 'express';
import * as usersControllers from '../controllers/users-controllers.js';
import { check } from 'express-validator'

const router = express.Router();

router.get('/', usersControllers.getUsers);
router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 3})
],usersControllers.signup);
// router.post('/signup',usersControllers.signup);
router.post('/login', usersControllers.login);

export default router;

