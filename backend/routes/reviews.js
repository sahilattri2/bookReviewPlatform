const express = require('express');
const Review = require('../models/Review');
const Book = require('../models/Book');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();
router.post('/:bookId', auth, async (req, res) => {
  try {
    const { review_text, rating } = req.body;
    const { bookId } = req.params;
    if (!review_text || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const review = new Review({
      book: bookId,
      reviewer: req.user.id,
      review_text,
      rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId }).populate('reviewer', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:bookId/average', async (req, res) => {
  try {
    const { bookId } = req.params;
    const result = await Review.aggregate([
      { $match: { book: require('mongoose').Types.ObjectId(bookId) } },
      { $group: { _id: '$book', avgRating: { $avg: '$rating' } } },
    ]);
    const avgRating = result[0]?.avgRating || 0;
    res.json({ average: avgRating });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router; 