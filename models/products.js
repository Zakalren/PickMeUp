import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const productsSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    category: String
}, {
    versionKey: false
});

const model = mongoose.model('Products', productsSchema);
export default model;