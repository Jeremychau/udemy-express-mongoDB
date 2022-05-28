import HttpError from '../models/http-error.js';
import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator'

import { placeModel } from '../models/places.js';

import { getCoordsForAddress } from '../util/location.js';

let DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      location: {
        lat: 40.7484474,
        lng: -73.9871516
      },
      address: '20 W 34th St, New York, NY 10001',
      creator: 'u1'
    }
];

const getPlacesById = (req, res, next) => {
    const placeId = req.params.pid; // { pid: 'p1' }
    const place = DUMMY_PLACES.find(p => p.id === placeId);

    if(!place) throw new HttpError('Could not find item', 404);

    res.json({ place });
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => p.creator === userId);

    if(!places || !places.length) throw new HttpError('Could not find user', 404);

    res.json({ places });
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        next( new HttpError('Invalid input.') );
    }

    const { title, description, address, creator } = req.body;

    let coordinates;

    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        next(error);
    }

    const createPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://post-phinf.pstatic.net/MjAyMjA0MjJfMTY4/MDAxNjUwNTk0NDk5NDg2.UyGRPfc3JerxDCQ-MQKz4OWSPO96-0NUhQ-IFOk3ZN4g.XC8eDFiZB86mJQ93ChXj6ASygvWvOSaVyGqik1u0ORsg.JPEG/%EC%B4%88%EB%A1%B11.jpg?type=w1200',
        creator
    });

    try {
        await createPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Create Place Fail', 500
        )
        return next(error)
    }

    DUMMY_PLACES.push(createPlace);
    res.status(201).json({place: createPlace});
};

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid input.')
    }
    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...DUMMY_PLACES.find(item => item.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex( item => item.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(item => item.id === placeId)) throw new HttpError('Could not find place.', 404)
    DUMMY_PLACES = DUMMY_PLACES.filter(item => item.id !== placeId);
    console.log(DUMMY_PLACES);
    res.status(200).json({message: 'deleted'})
};

export {getPlacesById, getPlacesByUserId, createPlace, updatePlace, deletePlace}