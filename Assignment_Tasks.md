# 📚 Assignment: Book Review Platform

## 🎯 Objective
Build a Book Review Platform where users can:
- Add new books
- View a list of all books with filters
- Write reviews for books
- Rate books (1 to 5 stars)
- View average rating per book

## ✅ Functional Requirements

### 📘 Books
- Each book should have:
  - title (string)
  - author (string)
  - genre (string)
- Users should be able to:
  - Add new books
  - View a paginated list of all books
  - Filter books by genre and/or author

### ✍️ Reviews
- Each book can have multiple reviews with:
  - review_text (string)
  - rating (integer from 1 to 5)
  - reviewer (logged-in user)
- Users should be able to:
  - Add a review and rating to any book
  - View all reviews for a book
  - See the average rating for each book on the listing and detail pages

## 💻 Technical Requirements

### 🔐 Authentication
- Implement simple Signup/Login using JWT
- Only logged-in users can add books or write reviews

### 🧠 Backend (Node.js)
- REST API with appropriate routes and validations
- Use any database (SQLite, PostgreSQL, or MongoDB)
- Use proper model relationships (1 book → many reviews)

### 🎨 Frontend (React)
- Use React with Hooks (no class components)
- Pages required:
  - Login / Signup
  - Book list page (with filters, pagination)
  - Add Book page
  - Book Detail page (show reviews + add review)
- You may use Axios for API calls and React Router for navigation.

## 🛠 Bonus (Optional but Appreciated)
- Use MUI / Tailwind / Chakra UI for styling
- Show visual stars in rating display
- Add sorting (by rating, date added)
- Add form validations
- Responsive UI
- Basic deployment (Vercel + Render/Railway)

## 🧪 Evaluation Criteria
| Area                        | Weight |
|-----------------------------|--------|
| Code Quality & Structure    | 25%    |
| Backend API Design & Security| 20%   |
| UI Flow & UX                | 20%    |
| Functionality Completeness  | 20%    |
| Bonus & Creativity          | 15%    |

## 🔒 Anti-Cheat Requirements
1. 5-minute Loom video walkthrough of your app and code structure
2. README.md with:
   - Setup instructions
   - Architecture decisions
   - Known limitations (if any)
3. GitHub Repository link with proper commits (no zip uploads)

## 📅 Submission Guidelines
- ⏱️ Deadline: 48 hours from the moment you receive this assignment
- 📬 Submit via: Google Form / Email / Notion (as instructed)
- 📦 Required: GitHub Repo + Loom Link + README.md 