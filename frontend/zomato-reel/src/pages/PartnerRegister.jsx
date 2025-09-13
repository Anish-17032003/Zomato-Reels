// ...existing code...
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // use elements for safe access
    const name = e.target.elements.name?.value?.trim() || '';
    const email = e.target.elements.email?.value?.trim() || '';
    const password = e.target.elements.password?.value || '';

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/food-partner/register`,
        { name, email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate('/food-partner/login');
    } catch (err) {
      console.error('Partner register error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed — check server logs');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="brand"><h1>Zomato Reel - Partner</h1></div>
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          <Link to="/user/register" className="btn" style={{padding:'0.4rem 0.7rem'}}>User</Link>
          <Link to="/food-partner/register" className="btn secondary" style={{padding:'0.4rem 0.7rem'}}>Food Partner</Link>
        </div>
        <p className="lead">Create your partner account</p>
        <form onSubmit={handleSubmit} >
          <input type="hidden" name="role" value="partner" />
          <div>
            <label>Partner name</label>
            <input name="name" type="text" placeholder="Name" />
          </div>
          <div>
            <label>Contact email</label>
            <input name="email" type="email" placeholder="partner@domain.com" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" placeholder="Choose a password" />
          </div>
          <div className="row">
            <button className="btn" type="submit">Create account</button>
            <Link to="/food-partner/login" className="btn secondary">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PartnerRegister;
// ...existing code...