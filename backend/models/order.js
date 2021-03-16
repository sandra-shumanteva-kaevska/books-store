import mongoose from 'mongoose'

export const Order = new mongoose.model('Order', {
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 12
    },
    quantity: {
        type: Number,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})