/*Login.jsx: This component provides a simple login and signup interface. It uses localStorage to store user credentials for demonstration purposes. The handleSignup function saves the user's email and password to localStorage, while the handleLogin function checks the entered credentials against the stored values. If the credentials match, it sets the user state in the parent component (App) and displays a success message. If not, it shows an error message. The component also includes basic styling for the login form and buttons.*/


/*useState -> to manage form input values, setUser -> function passed as prop to update user state in App.jsx after successful login, localStorage -> to store user credentials for demo purposes, handleSignup -> function to handle user signup and save credentials, handleLogin -> function to handle user login and validate credentials against localStorage, conditional rendering -> to show login form when user is not logged in.*/
import { useState } from "react";
import "./App.css";

/*Login -> component for handling user login and signup, setUser -> function to update user state in App.jsx, email and password -> form input values*/
function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const [newPassword, setNewPassword] = useState("");  

  /*handlesignup -> function to handle user signup and save credentials, user -> object containing email and password, localStorage -> to store user credentials for demo purposes and when data save successfully we can display a success message in alert*/
  const handleSignup = () => {
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful!");
  };

  /*handleLogin -> function to handle user login and validate credentials in localStorage, savedUser -> user data retrieved from localStorage, json.parse -> converts JSON string to JavaScript object, getitem -> retrieves item from localStorage*/
  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    
    /*!savedUser -> checks if savedUser is null or undefined then show alert*/
    if(!savedUser){
      alert("Please signup first!");
      return;
    }


    /*validate credentials: checks if savedUser exists and if the email and password match the entered values, if valid -> setUser is called to update user state in App.jsx and a success message is shown, if invalid -> an error message is displayed, session -> to track user login status, explain session -> tracks whether the user is currently logged in*/
    if (
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem("session", "active");
      setUser(savedUser);
      alert("Login successful!");
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleResetPassword = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
        alert("No user found! Please signup first.");
        return;
    }
    if (savedUser.email !== email) {
        alert("Email not matched!");
        return;
    }
    savedUser.password = newPassword;
    localStorage.setItem("user", JSON.stringify(savedUser));
    alert("Password reset successful!");
    setIsForgot(false);
  };

  return (
    /*Login container:-
    explanation: This is the main container for the login form, styled with CSS classes for layout and appearance*/
    
      
    <div className="login-container">
        <h2>💰 <strong>Expense Tracker Login Page</strong></h2>
        <input
            className="login-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        {/*isForgot -> boolean state to control forgot password view, if true -> shows forgot password form, else -> shows login form, when user clicks on "Forgot Password?" link then setIsForgot(true) is called*/}
        {!isForgot ? (
            <>
                <input
                    className="login-input"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-btn" onClick={handleSignup}>
                    Signup
                </button>
                <button className="login-btn" onClick={handleLogin}>
                    Login
                </button>
                <p
                    style={{ color: "red", cursor: "pointer", padding:"10px"}}
                    onClick={() => setIsForgot(true)}
                >
                    <strong>Forgot Password?</strong>
                </p>
            </>
        ) : (
            <>
                <input
                    className="login-input"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <button className="login-btn" onClick={handleResetPassword}>
                    Reset Password
                </button>
                <p
                    style={{ color: "black", cursor: "pointer", padding:"10px"}}
                    onClick={() => setIsForgot(false)}
                >
                    <strong>Back to Login</strong>
                </p>
            </>
       )}
    </div>
      
  );
}


export default Login;