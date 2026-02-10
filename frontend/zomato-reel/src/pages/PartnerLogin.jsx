import React from 'react';
import {NavLink, Link } from 'react-router-dom';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements?.email?.value?.trim() || '';
    const password = e.target.elements?.password?.value || '';

    try {
      const response = await api.post('/api/auth/food-partner/login', { email, password });
      console.log('partner login success', response.data);
      navigate('/create-food');
    } catch (err) {
      console.error('Partner login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed — check credentials or server');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="brand"><h1>Zomato Reel - Partner</h1></div>
        <p className="lead">Partner sign in</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <NavLink to="/user/login" className={({isActive})=>isActive?"btn active":"btn"} style={{ padding: '0.4rem 0.7rem' }}>User</NavLink>
          <NavLink to="/food-partner/login" className={({isActive})=>isActive?"btn secondary active":"btn secondary"} style={{ padding: '0.4rem 0.7rem' }}>Food Partner</NavLink>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input name="email" type="email" placeholder="partner@domain.com" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" placeholder="Your password" />
          </div>
          <div className="row">
            <button className="btn" type="submit">Sign in</button>
            <Link to="/food-partner/register" className="btn secondary">Create account</Link>
          </div>
          <p className="muted small" style={{marginTop:12}}>
            Or register as a <Link to="/user/register">normal user</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default PartnerLogin;

