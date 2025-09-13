import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import PartnerRegister from "../pages/PartnerRegister";
import PartnerLogin from "../pages/PartnerLogin";
import Home from "../pages/general/Home";
import BottomNav from "../component/BottomNav";
import Profile from "../pages/food-partner/Profile";
import Saved from "../pages/general/Saved";
import CreateFood from "../pages/food-partner/CreateFood";
import { Navigate } from 'react-router-dom';





const AppRoutes = () => {
  return (
    <Router>
      <Routes>
  <Route path="/user/register" element={<UserRegister />} />
  <Route path="/user/login" element={<UserLogin />} />
  <Route path="/food-partner/register" element={<PartnerRegister />} />
  <Route path="/food-partner/login" element={<PartnerLogin />} />
  {/* default root goes to login */}
  <Route path="/" element={<Navigate to="/user/login" replace />} />
  <Route path="/home" element={<><Home /><BottomNav /></>} />
  <Route path="/saved" element={<><Saved /><BottomNav /></>} />
        <Route path="/create-food" element={<CreateFood />} />
        
        <Route path="/food-partner/:id" element={<Profile/>}/>
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;