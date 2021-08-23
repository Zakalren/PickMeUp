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
    customer: {
        type: String,
        required: true
    },
    issuedAt: {
        type: Date,
        default: Date.now
    },
    complete: {
        type: Boolean,
        default: false
    },
    paymentData: {
        type: Object
    }
}, {
    versionKey: false
});

const model = mongoose.model('Orders', ordersSchema);
export default model;