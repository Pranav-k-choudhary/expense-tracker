/*main.jsx:-
--> purpose:- this is the entry point of the React application.
--> why this file is important:- it connects React with the HTML file (index.html) and starts rendering the whole application. (rerendering means updating the UI when data changes using React's virtual DOM)

--> main Concepts Used:-
---> StrictMode -> helps in identifying potential problems in the application during development mode, it does not affect production build but is useful for writing better code.
---> createRoot() -> this is the new way to create a root for rendering in React 18 and above, it replaces the older ReactDOM.render() method, it creates a root that can manage updates and re-rendering efficiently.
---> App Component -> this is the main component of the application that contains all the logic and UI for the Expense Tracker, it is imported from App.jsx and rendered inside StrictMode to ensure best practices during development.

import StrictMode from React:-
-> StrictMode is used to highlight potential problems in the application during development mode.
It helps developers write better code.*/
import { StrictMode } from 'react'
/*
import createRoot from React DOM:-
-> createRoot() is used to create the main root where the React app will be displayed.*/
import { createRoot } from 'react-dom/client'
/*import App Component:-
-> App.jsx is the main component of the application that contains all the logic and UI for the Expense Tracker, it is imported here to be rendered inside StrictMode to ensure best practices during development.*/
import App from './App.jsx'

/*render React App:-
 -> document.getElementById('root') :- this finds the div with id="root" from index.html (Example: <div id="root"></div>), this is where the React app will be rendered.
-> createRoot(document.getElementById('root')) :- this creates a React root that can manage updates and re-rendering efficiently.
-> .render() :- this method is used to render the React component (in this case, <App />) inside the created root.
-> <StrictMode><App /></StrictMode> :- this wraps the App component inside StrictMode to enable additional checks and warnings during development, it helps in identifying potential issues in the code.
React will load the full app inside it.
*/
createRoot(document.getElementById('root')).render(
  /*StrictMode wraps App component for better development checking*/
  <StrictMode>
    {/*main application for Expense Tracker*/}
    <App />
  </StrictMode>,
)