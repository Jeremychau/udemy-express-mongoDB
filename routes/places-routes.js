import express from 'express';
import * as placesControllers from '../controllers/places-controllers.js';
import { check } from 'express-validator'

const router = express.Router();

router.get('/:pid', placesControllers.getPlacesById);
router.get('/user/:uid', placesControllers.getPlacesByUserId);

router
    .post('/', [check('title').not().isEmpty(), check('description').isLength({min: 5}), check('address').not().isEmpty()], placesControllers.createPlace)
    .patch('/:pid', [check('title').not().isEmpty(), check('description').isLength({min: 5})],placesControllers.updatePlace)
    .delete('/:pid', placesControllers.deletePlace);

export default router;

