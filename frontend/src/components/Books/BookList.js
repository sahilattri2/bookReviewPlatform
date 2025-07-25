import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import StarRating from './StarRating';
import { Box, Typography, TextField, Button, Paper, Select, MenuItem, InputLabel, FormControl, Alert, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState('date');
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (genre) params.genre = genre;
      if (author) params.author = author;
      if (sort) params.sort = sort;
      const res = await api.get('/books', { params });
      setBooks(res.data.books);
      setTotal(res.data.total);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, [genre, author, page, sort]);
  const totalPages = Math.ceil(total / limit);
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, width: { xs: '99vw', sm: 600 }, maxWidth: 600 }}>
        <Typography variant="h5" mb={2}>Book List</Typography>
        <Box display="flex" flexWrap="wrap" gap={2} mb={2} flexDirection={{ xs: 'column', sm: 'row' }}>
          <TextField
            label="Genre"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            placeholder="Filter by genre"
            size="small"
            sx={{ flex: 1, minWidth: 120 }}
          />
          <TextField
            label="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Filter by author"
            size="small"
            sx={{ flex: 1, minWidth: 120 }}
          />
          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              value={sort}
              label="Sort by"
              onChange={e => setSort(e.target.value)}
            >
              <MenuItem value="date">Date Added (Newest)</MenuItem>
              <MenuItem value="rating">Rating (Highest)</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={() => { setGenre(''); setAuthor(''); setPage(1); }} sx={{ minWidth: 120 }}>
            Clear Filters
          </Button>
        </Box>
        {loading ? (
          <Typography>Loading books...</Typography>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <List>
              {books.length === 0 ? (
                <ListItem><ListItemText primary="No books found." /></ListItem>
              ) : (
                books.map(book => (
                  <ListItem key={book._id} alignItems="flex-start" divider sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                    <ListItemText
                      primary={<Link to={`/books/${book._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}><strong>{book.title}</strong></Link>}
                      secondary={<span>{book.author} ({book.genre})</span>}
                    />
                    {'avgRating' in book && book.avgRating !== undefined && book.avgRating !== null && (
                      <ListItemSecondaryAction sx={{ position: 'static', marginLeft: { xs: 0, sm: 2 }, marginTop: { xs: 1, sm: 0 } }}>
                        <StarRating rating={book.avgRating} />
                        <Typography variant="caption" ml={1}>({book.avgRating.toFixed(2)})</Typography>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))
              )}
            </List>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Button onClick={() => setPage(page - 1)} disabled={page === 1} variant="contained" sx={{ minWidth: 120 }}>Previous</Button>
              <Typography>Page {page} of {totalPages || 1}</Typography>
              <Button onClick={() => setPage(page + 1)} disabled={page === totalPages || totalPages === 0} variant="contained" sx={{ minWidth: 120 }}>Next</Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};
export default BookList; 