# Expense Tracker

This project is a simple Expense Tracker application built using React. The main workflow starts from the App component, where all expenses are stored using useState. When the application loads, saved data is fetched from localStorage so that expenses remain even after refreshing the page.

The user adds a new expense through the ExpenseForm component. The form collects the title and amount, creates a new expense object with a unique id, and sends it to the parent component using props.

The App component updates the state and stores the new list in localStorage using useEffect.

All expenses are displayed in the ExpenseList component, where each item is rendered using the ExpenseItem component.

When the delete button is clicked, the expense is removed using the filter() method and the state is updated again.

Finally, the total expense is calculated using the reduce() function and displayed on the UI.

## Live Demo
https://pranav-k-choudhary.github.io/expense-tracker/

## Features
- Add new expenses (title + amount)
- Delete expenses easily
- Automatic total expense calculation
- Data stored in browser localStorage
- Fully responsive design (mobile + desktop)
- Fast performance using Vite
- Clean and simple UI
  
## Tech Stack
- React.js
- Vite
- JavaScript 
- CSS3 (Flexbox + Media Queries)
- HTML
- localStorage API

## Project Workflow
- User opens the application
- User adds an expense using the form (title + amount)
- Data is stored in React state using `useState`
- Total expense is calculated using `reduce()`
- Expense list is displayed using components and props
- User can delete an expense using the delete button
- All data is saved in `localStorage` using `useEffect`
- On page reload, data is automatically restored from `localStorage`
  
## Development & Deployment Flow
- Develop the project using React + Vite
- Run development server using `npm run dev`
- Create production build using `npm run build`
- Deploy to GitHub Pages using `npm run deploy`
- Website is accessible online

