import React, { useState } from 'react';
import api from '../../api/axios';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const validate = () => {
    if (!title.trim() || title.trim().length < 3) return 'Title must be at least 3 characters.';
    if (!author.trim() || author.trim().length < 3) return 'Author must be at least 3 characters.';
    if (!genre.trim() || genre.trim().length < 3) return 'Genre must be at least 3 characters.';
    return '';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const vError = validate();
    setValidationError(vError);
    if (vError) return;
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/books',
        { title: title.trim(), author: author.trim(), genre: genre.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Book added successfully!');
      setTitle('');
      setAuthor('');
      setGenre('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, width: { xs: '98vw', sm: 400 }, maxWidth: 400 }}>
        <Typography variant="h5" mb={2}>Add Book</Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            fullWidth
            margin="normal"
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="Author"
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
            fullWidth
            margin="normal"
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="Genre"
            type="text"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            required
            fullWidth
            margin="normal"
            inputProps={{ minLength: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Add Book
          </Button>
        </form>
        {validationError && <Alert severity="warning" sx={{ mt: 2 }}>{validationError}</Alert>}
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};
export default AddBook; 