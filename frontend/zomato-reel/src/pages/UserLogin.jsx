import React from 'react';
import {Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // use elements so missing names don't throw
    const email = e.target.elements?.email?.value?.trim() || '';
    const password = e.target.elements?.password?.value || '';

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/login',
        { email, password },
        { withCredentials: true }
      );
      console.log('login success', response.data);
      // navigate only after successful response
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed — check credentials or server');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="brand"><h1>Zomato Reel</h1></div>
        <p className="lead">Welcome back — sign in to your account</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <NavLink to="/user/login" end  className={({isActive})=>isActive?"btn active":"btn"} style={{ padding: '0.4rem 0.7rem' }}>User</NavLink>
            <NavLink to="/food-partner/login" end  className={({isActive})=>isActive?"btn secondary active":"btn secondary"} style={{ padding: '0.4rem 0.7rem' }}>Food Partner</NavLink>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input name="email" type="email" placeholder="you@domain.com" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" placeholder="Your password" />
          </div>
          <div className="row">
            <button className="btn" type="submit">Sign in</button>
            <Link to="/user/register" className="btn secondary">Create account</Link>
          </div>
          <p className="muted small" style={{marginTop:12}}>
            Or register as a <Link to="/food-partner/register">food partner</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
