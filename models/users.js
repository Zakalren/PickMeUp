import mongoose from 'mongoose'

import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    service_number: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    affiliated_unit: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    tel_number: {
        type: String,
        required: true
    },
    registered_at: {
        type: Date,
        default: Date.now
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    avatarUrl: String,
    shopping_basket: Array
}, {
    versionKey: false
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "service_number"
});

const model = mongoose.model('Users', userSchema);
export default model;