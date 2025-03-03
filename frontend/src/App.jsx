import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';  
import Footer from './components/Footer';
import DashboardNavbar from './components/DashboardNavbar';

import Home from './pages/user/Home';
import About from './pages/user/About';
import Feature from './pages/user/Feature';
import Loginpage from './pages/user/Loginpage';
import SignupPage from './pages/user/Signup';

import Dashboard from './pages/user/Dashboard';
import Transaction from './pages/user/Transaction';
import Budget from './pages/user/Budget';
import Saving from './pages/user/Saving';
import Report from './pages/user/Report';
import Profile from './pages/user/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import FeedbackSupport from './pages/admin/FeedbackSupport';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/features" element={<><Navbar /><Feature /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Loginpage /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><SignupPage /><Footer /></>} />

        {/* User Dashboard Pages */}
        <Route path="/dashboard" element={<><DashboardNavbar /><Dashboard /><Footer /></>} />
        <Route path="/transactions" element={<><DashboardNavbar /><Transaction /><Footer /></>} />
        <Route path="/budget" element={<><DashboardNavbar /><Budget /><Footer /></>} />
        <Route path="/savings" element={<><DashboardNavbar /><Saving /><Footer /></>} />
        <Route path="/reports" element={<><DashboardNavbar /><Report /><Footer /></>} />
        <Route path="/profile" element={<><DashboardNavbar /><Profile /><Footer /></>} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<><AdminDashboard /><Footer /></>} />
        <Route path="/admin/user-management" element={<><UserManagement /><Footer /></>} />
        <Route path="/admin/feedback-support" element={<><FeedbackSupport/><Footer /></>} />
        </Routes>
    </Router>
  );
}

export default App;
