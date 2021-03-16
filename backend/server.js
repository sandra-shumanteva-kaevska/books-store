import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import booksData from './data/booksData.json'
import { Book } from './models/book.js'
import { Order } from './models/order.js'
import { Mailer } from './mailer'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/booksStore'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

if (process.env.RESET_DATABASE === 'true') {
    const populateDatabase = async () => {
        await Book.deleteMany()
        await Order.deleteMany()

        booksData.forEach(item => {
            const newBook = new Book(item)
            newBook.save()
        })
    }
    populateDatabase()
}

app.get('/', async (req, res) => {
    res.send("Wellcome to Book Store")
})

// ---------------------------- BOOKS ----------------------------

app.get('/books', async (req, res) => {
    const query = {}
    if (req.query.hasOwnProperty('title')) {
        query.title = { "$regex": req.query.title ?? '' }
    }
    if (req.query.hasOwnProperty('author')) {
        query.authors = { "$regex": req.query.author ?? '' }
    }
    if (req.query.hasOwnProperty('averageRating')) {
        query.average_rating = { $gte: req.query.averageRating }
    }
    if (req.query.hasOwnProperty('minNumPages')) {
        query.num_pages = { $gte: req.query.minNumPages }
    }
    if (req.query.hasOwnProperty('maxNumPages')) {
        query.num_pages = { ...query.num_pages, ...{ $lte: req.query.maxNumPages } }
    }
    if (req.query.hasOwnProperty('language')) {
        query.language_code = req.query.language
    }
    const books = await Book.find(query).sort({ title: 'asc' })
    res.json(books)
})

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).exec()

        book
            ? res.status(200).json(book)
            : res.status(404).json({ message: 'The book is not found' })
    }
    catch (err) {
        res.status(400).json({ message: 'Something went wrong', err: err.errors })
    }
})

app.post('/books', async (req, res) => {
    try {
        const newBook = await Book.create(req.body)
        res.status(201).json(newBook)
    }
    catch (err) {
        res.status(400).json({ message: 'The book can not be created', err: err.errors })
    }
})

app.delete('/books/:id', async (req, res) => {
    try {
        const deleteBook = await Book.findByIdAndRemove(req.params.id).exec()

        deleteBook
            ? res.status(204).json(deleteBook)
            : res.status(400).json({ message: 'The book could not be deleted' })

    }
    catch (err) {
        res.status(400).json({ message: 'Something went wrong', err: err.errors })
    }
})

// ---------------------------- ORDERS ----------------------------

app.get('/orders', async (req, res) => {
    const orders = await Order.find().populate({ path: 'book', select: ['title', 'author'] })
    res.json(orders)
})

app.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate({ path: 'book', select: ['title', 'author'] }).exec()

        order
            ? res.status(200).json(order)
            : res.status(404).json({ message: 'The order is not found' })
    }
    catch (err) {
        res.status(400).json({ message: 'Something went wrong', err: err.errors })

    }
})

app.post('/orders', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body)
        Mailer(req.body.email, req.body.firstName, req.body.lastName)
        res.status(201).json(newOrder)
    }
    catch (err) {
        res.status(400).json({ message: 'The order could not be created', err: err.errors })

    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});
