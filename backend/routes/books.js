const express = require('express');
const Book = require('../models/Book');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const router = express.Router();
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/', async (req, res) => {
  try {
    const { genre, author, page = 1, limit = 10, sort = 'date' } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    if (sort === 'rating') {
      const books = await Book.aggregate([
        { $match: filter },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'book',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            avgRating: { $avg: '$reviews.rating' },
          },
        },
        { $sort: { avgRating: -1, createdAt: -1 } },
        { $skip: (parseInt(page) - 1) * parseInt(limit) },
        { $limit: parseInt(limit) },
      ]);
      const total = await Book.countDocuments(filter);
      return res.json({ books, total });
    } else {
      const books = await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
      const total = await Book.countDocuments(filter);
      return res.json({ books, total });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router; 