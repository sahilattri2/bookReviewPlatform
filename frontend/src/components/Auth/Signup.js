import React, { useState, useContext } from 'react';
import api from '../../api/axios';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const { login } = useContext(AuthContext);
  const validate = () => {
    if (!username.trim()) return 'Username is required.';
    if (!email.match(/^\S+@\S+\.\S+$/)) return 'Invalid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
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
      const res = await api.post('/auth/signup', { username, email, password });
      login(res.data.token);
      setMessage('Signup successful!');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, width: { xs: '98vw', sm: 350 }, maxWidth: 350 }}>
        <Typography variant="h5" mb={2}>Signup</Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            fullWidth
            margin="normal"
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            inputProps={{ minLength: 6 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>
        {validationError && <Alert severity="warning" sx={{ mt: 2 }}>{validationError}</Alert>}
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};
export default Signup; 