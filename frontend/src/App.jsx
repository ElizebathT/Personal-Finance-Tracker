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

// Layouts for Public, Dashboard, and Admin sections
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const DashboardLayout = ({ children }) => (
  <>
    <DashboardNavbar />
    {children}
    <Footer />
  </>
);

const AdminLayout = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/features" element={<PublicLayout><Feature /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Loginpage /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><SignupPage /></PublicLayout>} />

        {/* User Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/transactions" element={<DashboardLayout><Transaction /></DashboardLayout>} />
        <Route path="/budget" element={<DashboardLayout><Budget /></DashboardLayout>} />
        <Route path="/savings" element={<DashboardLayout><Saving /></DashboardLayout>} />
        <Route path="/reports" element={<DashboardLayout><Report /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/user-management" element={<AdminLayout><UserManagement /></AdminLayout>} />
        <Route path="/admin/feedback-support" element={<AdminLayout><FeedbackSupport /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
