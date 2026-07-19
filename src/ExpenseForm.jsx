import { useState, useRef } from 'react'

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10))
  const [expenseTime, setExpenseTime] = useState(new Date().toTimeString().slice(0, 5))
  const titleRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !amount) {
      return alert('Please fill all fields!')
    }

    const createdAt = new Date(`${expenseDate}T${expenseTime || '00:00'}`).toISOString()

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(parseFloat(amount).toFixed(2)),
      createdAt,
    }

    onAddExpense(newExpense)
    setTitle('')
    setAmount('')
    setExpenseDate(new Date().toISOString().slice(0, 10))
    setExpenseTime(new Date().toTimeString().slice(0, 5))
    titleRef.current?.focus()
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        placeholder="Expense Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
      />

      <input
        placeholder="Amount ₹"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={expenseDate}
        onChange={(e) => setExpenseDate(e.target.value)}
      />

      <input
        type="time"
        value={expenseTime}
        onChange={(e) => setExpenseTime(e.target.value)}
      />

      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm