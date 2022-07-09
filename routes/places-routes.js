import express from 'express';
import * as placesControllers from '../controllers/places-controllers.js';
import { check } from 'express-validator';
import { fileUpload } from '../middleware/file-upoad.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.get('/:pid', placesControllers.getPlacesById);
router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.use(checkAuth);

router
    .post(
        '/',
        fileUpload.single('image'),
        [
            check('title').not().isEmpty(), check('description').isLength({min: 5}), check('address').not().isEmpty()
        ],
        placesControllers.createPlace
    )
    .patch('/:pid', [check('title').not().isEmpty(), check('description').isLength({min: 5})],placesControllers.updatePlace);

export default router;

