import { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import Login from './Login'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('expenseTrackerUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('expenseTrackerToken') || '')

  const isAuthenticated = Boolean(authToken && currentUser)

  const saveSession = (token, user) => {
    setAuthToken(token)
    setCurrentUser(user)
    localStorage.setItem('expenseTrackerToken', token)
    localStorage.setItem('expenseTrackerUser', JSON.stringify(user))
  }

  const clearSession = () => {
    setAuthToken('')
    setCurrentUser(null)
    localStorage.removeItem('expenseTrackerToken')
    localStorage.removeItem('expenseTrackerUser')
  }

  const loadExpenses = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/expenses', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Unable to load expenses from backend')
      }

      const data = await response.json()
      setExpenses(data)
      localStorage.setItem('expenses', JSON.stringify(data))
    } catch {
      const saved = localStorage.getItem('expenses')
      setExpenses(saved ? JSON.parse(saved) : [])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadExpenses()
    }
  }, [authToken])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = async (expense) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(expense),
      })

      if (!response.ok) {
        throw new Error('Could not save expense')
      }

      await loadExpenses()
    } catch {
      setExpenses((prev) => [...prev, expense])
    }
  }

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Could not delete expense')
      }

      await loadExpenses()
    } catch {
      setExpenses((prev) => prev.filter((item) => item._id ? item._id !== id : item.id !== id))
    }
  }

  const updateExpense = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error('Could not update expense')
      }

      await loadExpenses()
    } catch {
      setExpenses((prev) => prev.map((item) => {
        const matches = item._id ? item._id === id : item.id === id
        return matches ? { ...item, ...updatedData } : item
      }))
    }
  }

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0)

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLogin={saveSession} />
      ) : (
        <div className="app-container">
          <div className="header">
            <h1>💰 Expense Tracker</h1>
            <div className="header-actions">
              <span className="user-badge">Hi, {currentUser.name}</span>
              <button className="logout-btn" onClick={clearSession}>Logout</button>
            </div>
          </div>

          <ExpenseForm onAddExpense={addExpense} />

          <h3 className="total">Total Expense: ₹{totalExpenses.toFixed(2)}</h3>

          {isLoading ? (
            <p className="loading-text">Loading monthly data...</p>
          ) : (
            <ExpenseList expenses={expenses} onDelete={deleteExpense} onEdit={updateExpense} />
          )}
        </div>
      )}
    </div>
  )
}

export default App