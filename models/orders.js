import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const ordersSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    issuedAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

const model = mongoose.model('Orders', ordersSchema);
export default model;