import { useState } from 'react'

function ExpenseItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(item.title)
  const [draftAmount, setDraftAmount] = useState(String(item.amount || 0))
  const expenseDate = new Date(item.createdAt || Date.now())
  const rowsId = item._id || item.id

  const handleEdit = () => {
    if (!draftTitle.trim() || Number.isNaN(Number(draftAmount))) {
      window.alert('Please enter valid title and amount')
      return
    }

    onEdit(rowsId, {
      title: draftTitle.trim(),
      amount: Number(Number(draftAmount).toFixed(2)),
    })

    setIsEditing(false)
  }

  return (
    <tr className="expense-row">
      {isEditing ? (
        <>
          <td>
            <input value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} />
          </td>
          <td>{expenseDate.toLocaleDateString()}</td>
          <td>{expenseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
          <td>
            <input value={draftAmount} onChange={(event) => setDraftAmount(event.target.value)} />
          </td>
          <td className="action-cell">
            <button className="edit-btn" onClick={handleEdit}>💾</button>
            <button className="delete-btn" onClick={() => setIsEditing(false)}>↩️</button>
          </td>
        </>
      ) : (
        <>
          <td>{item.title}</td>
          <td>{expenseDate.toLocaleDateString()}</td>
          <td>{expenseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
          <td>₹{Number(item.amount || 0).toFixed(2)}</td>
          <td className="action-cell">
            <button className="edit-btn" onClick={() => {
              setDraftTitle(item.title)
              setDraftAmount(String(item.amount || 0))
              setIsEditing(true)
            }}>✏️</button>
            <button className="delete-btn" onClick={() => onDelete(rowsId)}>❌</button>
          </td>
        </>
      )}
    </tr>
  )
}

export default ExpenseItem