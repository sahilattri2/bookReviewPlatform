import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import BookList from './components/Books/BookList';
import AddBook from './components/Books/AddBook';
import BookDetail from './components/Books/BookDetail';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function App() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/books" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            Book Review Platform
          </Typography>
          {!isLoggedIn && <Button color="inherit" component={Link} to="/login">Login</Button>}
          {!isLoggedIn && <Button color="inherit" component={Link} to="/signup">Signup</Button>}
          <Button color="inherit" component={Link} to="/books">Book List</Button>
          {isLoggedIn && <Button color="inherit" component={Link} to="/add-book">Add Book</Button>}
          {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar>
      <Box mt={3}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/add-book" element={
            <PrivateRoute>
              <AddBook />
            </PrivateRoute>
          } />
          <Route path="/books/:id" element={
            <PrivateRoute>
              <BookDetail />
            </PrivateRoute>
          } />
          <Route path="/" element={<Login />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
