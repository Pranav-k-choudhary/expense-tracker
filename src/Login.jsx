import { useState } from 'react'
import './App.css'

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login'
      const payload = isRegistering
        ? { name, email, password }
        : { email, password }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      onLogin(data.token, data.user)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Expense Tracker</h2>
        <p>{isRegistering ? 'Create your account' : 'Login to your account'}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button className="login-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <button
          className="toggle-auth-btn"
          type="button"
          onClick={() => {
            setIsRegistering((prev) => !prev)
            setError('')
          }}
        >
          {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
        </button>
      </div>
    </div>
  )
}

export default Login;