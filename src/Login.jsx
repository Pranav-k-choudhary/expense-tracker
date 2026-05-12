/* Login.jsx: This component handles user authentication using Auth0. It displays a login button for unauthenticated users and a welcome message with a logout button for authenticated users. The component also shows a loading state while the authentication status is being determined. */
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'
function Login() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  if (isLoading) return <h2>Loading...</h2>;

  /*work flow:-
  --> If user is not authenticated, show login button.
  --> On clicking login button, it triggers loginWithRedirect() which redirects user to Auth0 login page.
  */
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Expense Tracker</h2>

        {isAuthenticated ? (
          <>
            <h3>Welcome {user.name}</h3>
            <p>{user.email}</p>

            <button
              className="logout-btn"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin + "/expense-tracker/",
                  },
                })
              }
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="login-btn"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;