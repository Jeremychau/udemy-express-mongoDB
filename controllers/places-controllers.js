import mongoose from 'mongoose';
import HttpError from '../models/http-error.js';
import { validationResult } from 'express-validator'

import Place from '../models/places.js';
import User from '../models/user.js';

import { getCoordsForAddress } from '../util/location.js';

const getPlacesById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Get Place Detail Fail', 500
        )
        return next(error)
    }

    if(!place) {
        const error = new HttpError('Could not find place', 404);
        return next(error);
    }

    res.status(200).json(place);
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        const error = new HttpError( 'Get Place Detail Fail', 500 )
        return next(error)
    }

    if(!userWithPlaces) {
        const error = new HttpError('Could not find place by user id', 404);
        return next(error);
    }

    res.status(200).json(userWithPlaces);
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const [error] = errors.array();
        next( new HttpError(`${error.param}  Invalid input.`) );
    }

    const { title, description, address } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        next(error);
    }

    let creatorId = req.userData.userId

    const createPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: req.file.path,
        creator: creatorId
    });

    let user;
    try {
        user = await User.findById(creatorId);
        if(!user){
            const error = new HttpError( 'Cannot find user by user id', 500 )
            return next(error)
        }
    } catch (err) {
        const error = new HttpError( 'Create Place Fail - user', 500 )
        return next(error)
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createPlace.save({session: sess});
        user.places.push(createPlace);
        await user.save({session:sess});
        sess.commitTransaction();
    } catch (err) {
        const error = new HttpError( 'Create Place Fail - place', 500 )
        return next(error)
    }

    res.status(201).json({place: createPlace});
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const [error] = errors.array();
        next( new HttpError(`${error.param}  Invalid input.`) );
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    let creatorId;

    try {
        place = await Place.findById(placeId);
        creatorId = place.creator.toString()
    } catch (err) {
        const error = new HttpError( 'Find Place Fail', 500 )
        return next(error)
    }

    if(creatorId !== req.userData.userId) return next(new HttpError('Can not update place!', 401))

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError( 'Update Place Fail', 500 )
        return next(error);
    }

    res.status(200).json(place);
};

export {getPlacesById, getPlacesByUserId, createPlace, updatePlace}