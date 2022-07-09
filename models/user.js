import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";
// import Place from "./places.js";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type:String, required: true },
    email: { type:String, required: true, unique: true },
    password: { type:String, required: true, minlength: 4 },
    image: { type:String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

// userSchema.plugin(uniqueValidator)

// export const User = mongoose.model('User', userSchema)
export default mongoose.model('User', userSchema)