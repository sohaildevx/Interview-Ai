import React from 'react'
import "../auth.form.scss"

export default function Login() {

  const handleSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <main>
      <div className="form-counter">
           <h1>Login</h1>

           <form className="auth-form">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />
              </div>
              <button className="button btn-primary" type="submit">Login</button>
           </form>
      </div> 
    </main>
  )
}
