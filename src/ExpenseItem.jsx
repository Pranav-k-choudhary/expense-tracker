/*expenseitem component:- purpose:- this component is used to display a single expense item.
why this file is important:- each expense added by the user is shown using this component.
main Concepts Used:-
--> props -> to receive expense data from parent component
--> event handling -> to delete a specific expense
--> reusable component -> used multiple times inside ExpenseList
--> item -> the individual expense data passed to this component, onDelete -> function to handle expense deletion*/
function ExpenseItem({ item, onDelete }) {
  /*props received:- item -> contains single expense object (Example: title: "Food", amount: 250), onDelete -> function to handle expense deletion*/
  return (
    /*single expense Card UI:-
    this card shows:-
    --> expense title -> item.title -> it displays the title of the expense, for example "Food"
    --> expense amount -> item.amount -> it displays the amount of the expense, for example 250
    --> delete button -> when user clicks it, onDelete function is called with the id of the expense to be deleted, onDelete(item.id) -> it calls the onDelete function passed as a prop with the id of the current expense item, this allows the parent component to identify which expense to remove from the list.
    expense-item -> css class for styling, onClick -> event handler for delete button, it calls onDelete function with the id of the expense item to be deleted.*/
    <div className="expense-item">
        {/*display expense title when item.title is available in the item object it shows the title of the expense*/}
        <span>{item.title}</span>
        {/*display expense amount when item.amount is available in the item object it shows the amount of the expense*/}
        <span>₹{item.amount}</span>
        {/*delete btn:- when user clicks ❌ btn:- onDelete(item.id) runs and it calls the onDelete function passed as a prop with the id of the current expense item, this allows the parent component to identify which expense to remove from the list.
        this sends the expense id to parent
        so that the selected expense can be removed*/}
        <button onClick={() => onDelete(item.id)}>❌</button>
    </div>
  )
}

export default ExpenseItem