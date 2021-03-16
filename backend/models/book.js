import mongoose from 'mongoose'

export const Book = new mongoose.model('Book', {
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    authors: {
        type: String,
        required: true,
        minlength: 2
    },
    average_rating: Number,
    isbn: {},
    isbn13: Number,
    language_code: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    num_pages: {
        type: Number,
        required: true,
    },
    ratings_count: Number,
    text_reviews_count: Number
})