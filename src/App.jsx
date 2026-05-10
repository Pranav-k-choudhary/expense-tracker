/*This is the main parent component of the project, why this file is important -> it controls the complete Expense Tracker logic.
Main Concepts Used:-
--> useState -> to store expenses
-->useEffect -> to save data in localStorage
--> localStorage -> to save data permanently
--> reduce() -> to calculate total expenses
--> Props -> to pass functions/data to child components
*/
import { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import './App.css'

function App() {

  /*useState with function initialization, why -> it loads saved expenses from localStorage when app starts, if data exists -> JSON.parse converts string to array, else -> empty array []*/
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses")
    return saved ? JSON.parse(saved) : [];
  })

  /*useEffect runs whenever expenses change, why -> it saves latest expenses into localStorage, this helps data remain even after page refresh*/
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  },[expenses])

  /*add new expense, prev -> previous expenses array, [...prev, expense] -> old expenses + new expense*/
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense] )
  }

  /*delete expense using id, filter() -> remove selected expense*/
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id != id) )
  }

  /*reduce(), used to calculate total expenses, sum -> accumulated(jama hua total) value, item.amount -> each expense amount*/
  const totalExpenses  = expenses.reduce((sum, item) => sum + item.amount, 0)

  return (
    //Main container of the application, it contains header, ExpenseForm, total expenses and ExpenseList
    <div className="app-container">
      {/*Header of the application*/}
      <div className='header'><h1>💰 Expense Tracker</h1></div>
      {/*child component for adding expenses, onAddExpense -> function to add new expense*/}
      <ExpenseForm onAddExpense={addExpense} />
      {/*total expense display, totalExpenses -> calculated total expenses, totalExpenses.toFixed(2) -> formats the total to 2 decimal places*/}
      <h3 className="total">Total Expense: ₹{totalExpenses.toFixed(2)}</h3>
      {/*child component for showing expenses, expenses -> array of expenses, onDelete -> function to delete an expense*/}
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  )
}

export default App