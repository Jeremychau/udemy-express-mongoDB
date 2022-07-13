import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'

import placesRoutes from './routes/places-routes.js';
import usersRoutes from './routes/users-routes.js';

import HttpError from './models/http-error.js';

const app = express();

app.use(bodyParser.json());

//handle image req
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
// for combined Front + Back end
app.use( express.static(path.join('public')));

// app.use(cors());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use( (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public' ,'index.html')); //unknow router to frontend index.html
} )

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this Route')
//     throw error;
// });

app.use((error, req, res, next) => {
    if(req.body.file) fs.unlink(req.body.file.path, (err)=> console.log(err));
    if (res.headerSent) return next(error)
    res.status(error.code || 500).json({message: error.message || 'An unknow error occurred!'});
});

mongoose
    .connect(`mongodb+srv://${process.env.dbusername}:${process.env.dbuserpw}@cluster0.u0pyb.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`)
    .then( () => {
        app.listen( process.env.PORT || 3030);
    } )
    .catch( err => console.log(err) );