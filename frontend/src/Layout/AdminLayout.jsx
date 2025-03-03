// src/layouts/AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom"; // This is where the content will change

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">Finance Admin</h1>
          </div>
          <nav>
            <ul className="space-y-4">
              {/* Links will be routed dynamically */}
              <li>
                <a href="/admin/user-management" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                  <Users size={20} /> User Management
                </a>
              </li>
              <li>
                <a href="/admin/reports" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                  <BarChart size={20} /> Reports
                </a>
              </li>
              <li>
                <a href="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                  <Settings size={20} /> Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          {/* Dynamic content will be rendered here */}
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black p-4 text-center text-white shadow-md">
        © 2025 Finance Web App. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminLayout;
