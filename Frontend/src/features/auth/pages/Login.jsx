import React, { useState } from 'react'
import "../auth.form.scss"
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
      
       const {loading, handleLogin} = useAuth();
       
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await handleLogin({email, password});
  }

  if(loading){
     return (
        <div className="loading">
            <h2>Loading...</h2>
        </div>
     )
  }
  return (
    <main>
      <div className="form-counter">
           <h1>Login</h1>

           <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="button btn-primary" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
           </form>

           <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div> 
    </main>
  )
}
