# Book Review Platform

## Overview
A full-stack web application where users can:
- Add new books
- View a list of all books with filters, pagination, and sorting
- Write reviews for books
- Rate books (1 to 5 stars)
- View average rating per book

## Tech Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Auth
- **Frontend:** React (Hooks), React Router, Axios, MUI

## Features
- User authentication (signup, login, logout)
- Add, list, filter, paginate, and sort books
- Add and view reviews for books
- Average rating display
- Protected routes for authenticated actions
- Enhanced form validation (all forms robustly validated)
- Responsive UI (mobile-friendly, MUI breakpoints)
- Polished design (MUI components, consistent feedback)

## Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Backend
1. `cd backend`
2. Create a `.env` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/bookreview
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend
1. `cd frontend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```
4. The app runs at [http://localhost:3000](http://localhost:3000)

## Architecture Decisions
- JWT Auth for stateless authentication; token stored in localStorage.
- MongoDB for flexible schema and easy local/cloud setup.
- React Hooks for modern, functional state management.
- REST API for clean separation between frontend and backend.
- Protected routes for authenticated actions.
- Sorting & pagination on both backend and frontend for scalability.
- MUI for consistent, responsive, and modern UI.

## Known Limitations
- No email verification or password reset.
- No user profile or admin panel.
- No file/image upload for books or users.
- Basic error handling (can be improved)
  
### Loom Video Walkthrough
[https://www.loom.com/share/f7e4dc49bfc045aa9b55ae8f6d03fa5b?sid=93f94bdf-cf72-4de0-a12e-99394509c7c8]

---
