import { render, screen } from '@testing-library/react';
import BookList from './BookList';
import React from 'react';

// Mock API module to prevent real HTTP requests
jest.mock('../../api/axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { books: [], total: 0 } }))
}));

test('renders Book List and loading state', () => {
  render(<BookList />);
  expect(screen.getByText(/Book List/i)).toBeInTheDocument();
  expect(screen.getByText(/Loading books/i)).toBeInTheDocument();
}); 