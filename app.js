import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config'

import placesRoutes from './routes/places-routes.js';
import usersRoutes from './routes/users-routes.js';

import HttpError from './models/http-error.js';

const app = express();

app.use(bodyParser.json());
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this Route')
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error)
    res.status(error.code || 500).json({message: error.message || 'An unknow error occurred!'});
});

mongoose
    .connect(`mongodb+srv://${process.env.dbusername}:${process.env.dbuserpw}@cluster0.u0pyb.mongodb.net/places?retryWrites=true&w=majority`)
    .then( () => {
        app.listen(3030);
    } )
    .catch( err => console.log(err) );