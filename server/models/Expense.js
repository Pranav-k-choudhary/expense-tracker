import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema)

export default Expense
