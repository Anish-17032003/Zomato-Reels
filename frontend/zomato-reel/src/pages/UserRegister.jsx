import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import {useNavigate} from 'react-router-dom';

const UserRegister = () => {
    const navigate=useNavigate();
    // jo bhi frontend se chheez backend pe bhejni hai wo yaha se hogi aur uske liye hume ek package install karna padega jiska naam hai axios
    const handleSubmit = async (e) => {
        e.preventDefault();
        // form data ko yaha se leke backend pe bhejna hai
        const fullname=e.target.fullname.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/user/register`,{
            fullname, email, password
    },{withCredentials:true})
    console.log(response.data);
    navigate('/');
}
  return (
    <div className="container">
      <div className="card">
        <div className="brand"><h1>Zomato Reel</h1></div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Link to="/user/register" className="btn" style={{ padding: '0.4rem 0.7rem' }}>User</Link>
          <Link to="/food-partner/register" className="btn secondary" style={{ padding: '0.4rem 0.7rem' }}>Food Partner</Link>
        </div>

        <p className="lead">Create your user account</p>

        <form onSubmit={handleSubmit}> 
          <input type="hidden" name="role" value="user" />

          <div>
            <label>Full name</label>
            <input name="fullname" type="text" placeholder="Full name" />
          </div>

          <div>
            <label>Email</label>
            <input name="email" type="email" placeholder="you@domain.com" />
          </div>

          <div>
            <label>Password</label>
            <input name="password" type="password" placeholder="Choose a password" />
          </div>

          <div className="row">
            <button className="btn" type="submit">Create account</button>
            <Link to="/user/login" className="btn secondary">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
