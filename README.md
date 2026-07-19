# Expense Tracker

Expense Tracker is a full-stack web application designed to help users manage personal expenses in a structured, monthly organized way.

This project was built to solve a common problem: people often keep expenses in plain notes, spreadsheets, or browser memory, which makes it difficult to:

- trace spending over time,
- separate expenses by month,
- update incorrect entries,
- keep records secure with user authentication.

The application provides a clean and practical solution for tracking daily spending, viewing monthly breakdowns, and safely storing the data for each logged-in user.

## Problem Statement

Before this project, a basic expense tracker usually had limitations such as:

- no dedicated user accounts,
- no proper backend persistence,
- no monthly organization in separate sections,
- no secure authentication system,
- no easy way to edit existing expense records.

This application solves those issues by combining:

- a React frontend for the user interface,
- an Express backend for API handling,
- MongoDB for persistent storage,
- JWT + bcrypt for user authentication,
- a safe local fallback mode when the database is unavailable.

## What This App Solves

The application helps users:

- register and log in securely,
- add new expenses with title, amount, date, and time,
- edit wrong or old expense entries,
- delete expenses when needed,
- view total spending at a glance,
- organize expenses month-wise in separate tables,
- keep records separated per user account.

## Key Features

- User registration and login system
- JWT-based protected routes
- Expense creation with date and time capture
- Expense update and delete support
- Monthly grouping of expenses
- Separate table views for different months
- Total expense calculation
- MongoDB-backed data persistence
- Local fallback mode when MongoDB is offline
- Responsive UI for mobile and desktop

## Technology Stack

### Frontend

- React 19
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Tokens)
- bcryptjs

### Storage Strategy

- MongoDB when configured and available
- Local fallback mode for safe local development when MongoDB is not running

## Project Architecture

The application follows a simple full-stack structure:

1. Client-side React app
   - renders the UI,
   - handles forms,
   - sends authenticated requests to the backend.

2. Express server
   - exposes authentication APIs,
   - exposes expense CRUD APIs,
   - validates the user token,
   - communicates with MongoDB.

3. MongoDB / fallback storage
   - stores user accounts and expense data,
   - keeps the app persistent in production,
   - falls back safely in local development when MongoDB is unavailable.

## Folder Structure

- `src/` → React frontend components
  - `App.jsx` → main application flow and session logic
  - `ExpenseForm.jsx` → form for adding expenses
  - `ExpenseList.jsx` → month-wise expense listing
  - `ExpenseItem.jsx` → per-row expense display and edit actions
  - `Login.jsx` → user registration/login screen
- `server/` → backend API logic
  - `index.js` → Express server, auth routes, expense routes, database connection
- `public/` → static assets
- `dist/` → production build output

## How the App Works

1. A user registers or logs in.
2. The backend verifies the credentials and returns a JWT token.
3. The frontend stores the token in localStorage.
4. The user adds an expense with title, amount, date, and time.
5. The backend stores the expense under that user account.
6. Expenses are grouped by month on the frontend.
7. The user can edit or delete expense records at any time.

## API Overview

### Authentication

- `POST /api/auth/register` → create a new user account
- `POST /api/auth/login` → log in an existing user

### Expenses

- `GET /api/expenses` → fetch all expenses for the logged-in user
- `POST /api/expenses` → add a new expense
- `PUT /api/expenses/:id` → update an existing expense
- `DELETE /api/expenses/:id` → remove an expense

## Environment Setup

Create a `.env` file in the project root with values like:

```env
PORT=5000
JWT_SECRET=expense-tracker-secret
MONGODB_URI=
```

Notes:

- If `MONGODB_URI` is empty or not connected, the app runs in fallback mode.
- This is useful for local development and safe testing without crashing the server.

## Installation

```bash
npm install
```

## Run the Project

Start the backend:

```bash
npm run server
```

Start the frontend:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Production / Deployment Notes

- The frontend is built with Vite.
- The backend is a Node.js Express server.
- For deployment, a hosted MongoDB service should be configured and the `MONGODB_URI` value should be set correctly.
- The app can then run as a proper full-stack web application instead of a local fallback demo.

## Why This Project Is Useful

This project is more than a simple expense tracker because it demonstrates:

- modern React UI development,
- secure authentication flow,
- full-stack API integration,
- structured monthly expense management,
- scalable backend design with MongoDB support.

## Summary

This project solves the need for a personal expense management system that is:

- secure,
- organized by month,
- editable,
- persistent,
- and user-specific.

It is suitable for learning full-stack web development, building a useful personal finance tool, or extending further with charts, analytics, budget alerts, and reports.
