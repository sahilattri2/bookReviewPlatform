import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import StarRating from './StarRating';
import { Box, Button, TextField, Typography, Alert, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError('Failed to fetch book details');
      }
    };
    fetchBook();
  }, [id]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/${id}`);
        setReviews(res.data);
      } catch (err) {
        setError('Failed to fetch reviews');
      }
    };
    fetchReviews();
  }, [id, message]);
  useEffect(() => {
    const fetchAverage = async () => {
      try {
        const res = await api.get(`/reviews/${id}/average`);
        setAverage(res.data.average);
      } catch (err) {
        setAverage(null);
      }
    };
    fetchAverage();
  }, [id, message]);
  const validateReview = () => {
    if (!reviewText.trim() || reviewText.trim().length < 5) return 'Review must be at least 5 characters.';
    if (rating < 1 || rating > 5) return 'Rating must be between 1 and 5.';
    return '';
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const vError = validateReview();
    setValidationError(vError);
    if (vError) return;
    try {
      const token = localStorage.getItem('token');
      await api.post(
        `/reviews/${id}`,
        { review_text: reviewText.trim(), rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Review added!');
      setReviewText('');
      setRating(5);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    }
  };
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!book) return <Typography>Loading book details...</Typography>;
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, width: { xs: '99vw', sm: 500 }, maxWidth: 500 }}>
        <Typography variant="h5" mb={2}>Book Detail</Typography>
        <Typography><strong>Title:</strong> {book.title}</Typography>
        <Typography><strong>Author:</strong> {book.author}</Typography>
        <Typography><strong>Genre:</strong> {book.genre}</Typography>
        <Typography><strong>Average Rating:</strong> {average !== null ? <StarRating rating={average} /> : 'N/A'} {average !== null && `(${average.toFixed(2)})`}</Typography>
        <Box mt={3}>
          <Typography variant="h6">Reviews</Typography>
          <ul style={{ paddingLeft: 20 }}>
            {reviews.length === 0 ? (
              <li>No reviews yet.</li>
            ) : (
              reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.reviewer?.username || 'User'}:</strong> {review.review_text} <StarRating rating={review.rating} />
                </li>
              ))
            )}
          </ul>
        </Box>
        <Box mt={3}>
          <Typography variant="h6">Add a Review</Typography>
          <form onSubmit={handleReviewSubmit} autoComplete="off">
            <TextField
              label="Review"
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              required
              fullWidth
              margin="normal"
              multiline
              minRows={2}
              inputProps={{ minLength: 5 }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                value={rating}
                label="Rating"
                onChange={e => setRating(Number(e.target.value))}
              >
                {[1,2,3,4,5].map(num => (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Submit Review
            </Button>
          </form>
          {validationError && <Alert severity="warning" sx={{ mt: 2 }}>{validationError}</Alert>}
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
      </Paper>
    </Box>
  );
};
export default BookDetail; 