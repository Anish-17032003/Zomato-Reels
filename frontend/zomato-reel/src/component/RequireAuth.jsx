import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios.get('http://localhost:3000/api/auth/me', { withCredentials: true })
      .then(() => {
        if (mounted) setLoading(false);
      })
      .catch(() => {
        if (mounted) navigate('/user/login', { replace: true });
      });
    return () => { mounted = false; };
  }, [navigate]);

  if (loading) return null;
  return <>{children}</>;
};

export default RequireAuth;
