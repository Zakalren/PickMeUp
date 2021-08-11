import mongoose from 'mongoose'

import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    service_number: String,
    name: String,
    affiliated_unit: String,
    rank: String,
    date_of_birth: Date,
    tel_number: String,
    avatarUrl: String,
    registered_at: {
        type: Date,
        default: Date.now
    },
    shopping_basket: Array
}, {
    versionKey: false
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "service_number"
});

const model = mongoose.model('Users', userSchema);
export default model;