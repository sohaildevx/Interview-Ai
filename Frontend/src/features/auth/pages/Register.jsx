import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {

  const navigate = useNavigate();

  const {loading, handleRegister} = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const result = await handleRegister({username, email, password});
    if (result?.ok) {
      navigate("/login");
    }
  }

  if(loading) {
    return <div className="loader">Loading...</div>
  }
  return (
    <main>
      <div className="form-counter">
           <h1>Register</h1>

           <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="Username">Username</label>
                <input type="text" id="Username" name="Username" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="Email">Email</label>
                <input type="email" id="Email" name="Email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="Password">Password</label>
                <input type="password" id="Password" name="Password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="button btn-primary" type="submit">Register</button>
           </form>

           <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div> 
    </main>
  )
}
