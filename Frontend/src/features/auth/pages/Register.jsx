import React from 'react'

export default function Register() {

  const handleSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <main>
      <div className="form-counter">
           <h1>Register</h1>

           <form className="auth-form">
              <div className="input-group">
                <label htmlFor="Username">Username</label>
                <input type="text" id="Username" name="Username" placeholder="Enter your username" required />
              </div>
              <div className="input-group">
                <label htmlFor="Email">Email</label>
                <input type="email" id="Email" name="Email" placeholder="Enter your email" required />
              </div>
              <div className="input-group">
                <label htmlFor="Password">Password</label>
                <input type="password" id="Password" name="Password" placeholder="Enter your password" required />
              </div>
              <button className="button btn-primary" type="submit">Register</button>
           </form>
      </div> 
    </main>
  )
}
