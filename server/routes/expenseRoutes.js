import express from 'express'
import crypto from 'crypto'
import Expense from '../models/Expense.js'
import { fallbackExpenses } from '../data/fallbackStore.js'
import { isMongoReady } from '../config/db.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

const generateExpenseId = () => (crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}-${Math.random().toString(16).slice(2)}`)

router.get('/', authenticate, async (req, res) => {
  if (!isMongoReady()) {
    return res.json(fallbackExpenses.filter((expense) => expense.userId === req.user.id))
  }

  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 })
    return res.json(expenses)
  } catch (error) {
    return res.status(500).json({ message: 'MongoDB query failed', error: error.message })
  }
})

router.post('/', authenticate, async (req, res) => {
  const { title, amount, createdAt } = req.body

  if (!title || !amount) {
    return res.status(400).json({ message: 'Title and amount are required' })
  }

  const newExpense = {
    _id: generateExpenseId(),
    id: generateExpenseId(),
    title,
    amount: Number(amount),
    createdAt: createdAt || new Date().toISOString(),
    userId: req.user.id,
  }

  if (!isMongoReady()) {
    fallbackExpenses.unshift(newExpense)
    return res.status(201).json(newExpense)
  }

  try {
    const expense = await Expense.create(newExpense)
    return res.status(201).json(expense)
  } catch (error) {
    return res.status(500).json({ message: 'MongoDB save failed', error: error.message })
  }
})

router.put('/:id', authenticate, async (req, res) => {
  const { title, amount } = req.body

  if (!title || amount === undefined || amount === null || Number.isNaN(Number(amount))) {
    return res.status(400).json({ message: 'Title and valid amount are required' })
  }

  const updatedData = {
    title,
    amount: Number(amount),
  }

  if (!isMongoReady()) {
    const index = fallbackExpenses.findIndex((expense) => expense.userId === req.user.id && (expense._id === req.params.id || expense.id === req.params.id))

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    fallbackExpenses[index] = {
      ...fallbackExpenses[index],
      ...updatedData,
    }

    return res.status(200).json(fallbackExpenses[index])
  }

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updatedData,
      { new: true }
    )

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    return res.status(200).json(updatedExpense)
  } catch (error) {
    return res.status(500).json({ message: 'MongoDB update failed', error: error.message })
  }
})

router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params

  if (!isMongoReady()) {
    const index = fallbackExpenses.findIndex((expense) => expense.userId === req.user.id && (expense._id === id || expense.id === id))

    if (index >= 0) {
      fallbackExpenses.splice(index, 1)
      return res.status(200).json({ message: 'Deleted' })
    }

    return res.status(404).json({ message: 'Expense not found' })
  }

  try {
    const deleted = await Expense.findOneAndDelete({ _id: id, userId: req.user.id })

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    return res.status(200).json({ message: 'Deleted' })
  } catch (error) {
    return res.status(500).json({ message: 'MongoDB delete failed', error: error.message })
  }
})

export default router
