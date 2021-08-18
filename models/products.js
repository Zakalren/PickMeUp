import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: Number,
}, {
    versionKey: false
});

const model = mongoose.model('Products', productsSchema);
export default model;