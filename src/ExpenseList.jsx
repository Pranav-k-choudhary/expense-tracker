import ExpenseItem from './ExpenseItem'

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return <p className="no-expense">No Expenses Yet</p>
  }

  const groupByMonth = expenses.reduce((accumulator, item) => {
    const date = new Date(item.createdAt || Date.now())
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!accumulator[monthKey]) {
      accumulator[monthKey] = []
    }

    accumulator[monthKey].push(item)
    return accumulator
  }, {})

  const monthEntries = Object.entries(groupByMonth).sort(([a], [b]) => b.localeCompare(a))

  return (
    <div className="month-table-wrapper">
      {monthEntries.map(([monthKey, items]) => {
        const [year, month] = monthKey.split('-')
        const monthLabel = new Date(Number(year), Number(month) - 1).toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })

        return (
          <div className="month-card" key={monthKey}>
            <h3>{monthLabel}</h3>
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <ExpenseItem key={item._id || item.id} item={item} onDelete={onDelete} onEdit={onEdit} />
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export default ExpenseList