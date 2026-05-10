/*expenseList component:- purpose:- this component is used to display all expenses.
why this file is important:- it receives the full expenses array from App.jsx and shows all expense items using ExpenseItem component.
main Concepts Used:-
--> props -> to receive data and functions from parent
--> conditional rendering -> show message if no expenses exist
--> map() -> to display multiple expense items
--> reusable Component -> uses ExpenseItem multiple times
--> useState -> to manage local state, useEffect -> to perform side effects like data fetching api's, localStorage -> to persist data, reduce() -> to calculate total expenses, event handling -> to handle delete action, props drilling -> to pass data/functions through components.*/
import { useState, useEffect } from 'react'
//ExpenseItem component is imported to display each individual expense item in the list
import ExpenseItem from './ExpenseItem'
//ExpenseList component receives expenses array and onDelete function as props from App.jsx, it uses these props to display the list of expenses and handle deletion of expenses.
function ExpenseList({ expenses, onDelete }) {
  /*props received:-
  expenses -> full array of all expenses (Example:[{ id: 1, title: "Food", amount: 200 }, { id: 2, title: "Travel", amount: 500 }]),
  onDelete -> function used to delete expense
  conditional rendering:-
  if no expenses are available -> show message: "No Expenses Yet"*/
    if(expenses.length === 0){
        return <p className='no-expense '>No Expenses Yet</p>
    }
  
    /*expense list UI:-
    --> expense-list -> css class for styling
    --> map() is used to loop through all expenses 
    --> For every expense item: ExpenseItem component is created
    --> key={item.id} -> React uses key for better performance and unique identification, onDelete={onDelete} -> passes the delete function to each ExpenseItem*/
    return (
    <div className="expense-list">
       {expenses.map((item) => (
            <ExpenseItem key={item.id} item={item} onDelete={onDelete}  />
       ))}
    </div>
  )
}

export default ExpenseList