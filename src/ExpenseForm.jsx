/*expenseform component: - purpose: this component is used to add a new expense.
main Concepts Used:-
--> useState -> to store input field values
--> useRef -> to focus input field automatically
--> form handling -> to submit expense data
--> Props -> to send new expense data to parent component, sent new expense data to App.jsx using onAddExpense function passed as prop, this allows App.jsx to update the expenses list with new expense.
why it file is important:- it takes user input (title + amount) and sends it to App.jsx, for storing in the expense list.*/
import { useState, useEffect, useRef } from 'react'

function ExpenseForm({ onAddExpense }) {
    /*useState for Title Input:- title -> stores expense title, setTitle -> updates title value, useState empty string in starting*/
    const [title, setTitle] = useState("")
    /*useState for Amount Input:- amount -> stores expense amount, setAmount -> updates amount value, useState 0 in starting*/
    const [amount, setAmount] = useState("")
    /*useRef for Input Focus:- titleRef is used to automatically focus
    the title input field after form submission*/
    const titleRef = useRef();

    /*handle form submit function:- purpose: this function runs when user clicks "Add Expense" button.
    --> prevent page refresh
    --> check if fields are empty then show alert
    --> create new expense object
    --> send data to parent component
    --> clear input fields
    --> focus title input again*/
    const handleSubmit = (e) => {
        e.preventDefault();
        /*prevent empty form submission*/
        if(!title || !amount) return alert("Please fill all fields!")
        /*create new expense object:- id -> unique id using Date.now(), date.now returns current timestamp.
        title -> expense title, amount -> converted into number using parseFloat()*/
        const newExpense = {
            id: Date.now(),
            title,
            amount: parseFloat(amount)
        } 
        /*send new expense to parent component using props function, props function means the function passed as a prop to this component, props function is onAddExpense*/
        onAddExpense(newExpense)
        /*clear both input fields after submit*/
        setTitle("")
        setAmount("")
        /*focus cursor back to title input field, benifit of it is that user can immediately start typing the next expense title, it helps in improving user experience*/
        titleRef.current.focus();
    }
    /*UI Part (return JSX):- 
    form contains:-
    --> expense Title i/p
    --> amount i/p
    --> add expense btn
    --> expense-form -> are css custom styles, onSubmit -> handles form submission, handleSubmit -> function to handle form submission*/
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
        {/*i/p for expense title, placeholder -> it shows hint to user in the i/p field, type -> text i/p, value -> current title value, onChange -> updates title value when user types, setTitle -> function to update title value, ref -> to focus the input field*/}
        <input 
            placeholder="Expense Title" 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
        />

        {/*i/p for expense amount, placeholder -> it shows hint to user in the i/p field, type -> number i/p, value -> current amount value, onChange -> updates amount value when user types, setAmount -> function to update amount value*/}
        <input 
            placeholder="Amount ₹" 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
        />

        {/*submit btn, type -> submit, when user clicks it, the form is submitted*/}
        <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm