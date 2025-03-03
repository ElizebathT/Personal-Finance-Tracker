import { useState } from "react";
import { Search, Home, Users, BarChart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

const initialFeedbackData = [
  { id: 1, user: "John Doe", issue: "Transaction Issue", status: "Open", priority: "High", date: "2025-02-22" },
  { id: 2, user: "Alice Smith", issue: "Budget Not Syncing", status: "In Progress", priority: "Medium", date: "2025-02-21" },
  { id: 3, user: "Mark Lee", issue: "UI Bug", status: "Resolved", priority: "Low", date: "2025-02-20" }
];

function FeedbackSupport() {
  const [search, setSearch] = useState("");
  const [feedbackData, setFeedbackData] = useState(initialFeedbackData);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/user-management": "User Management",
    "/admin/feedback-support": "Feedback & Support",
    "/admin/reports": "Reports",
    "/admin/settings": "Settings",
  };

  const handleResolve = (id) => {
    if (window.confirm("Are you sure you want to mark this issue as resolved?")) {
      setFeedbackData(feedbackData.map(ticket => 
        ticket.id === id ? { ...ticket, status: "Resolved" } : ticket
      ));
    }
  };

  const filteredData = feedbackData.filter(ticket =>
    (ticket.user.toLowerCase().includes(search.toLowerCase()) ||
    ticket.issue.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus === "" || ticket.status === filterStatus) &&
    (filterPriority === "" || ticket.priority === filterPriority)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg flex flex-col p-5">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo-img.png" alt="Logo" className="h-6 w-6" />
            <h1 className="text-xl font-bold text-gray-800">Finance Admin</h1>
          </div>
          {/* Navigation */}
          <nav>
            <ul className="space-y-3">
              <li>
                <Link to="/admin" className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${location.pathname === "/admin" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}>
                  <Home size={20} /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/user-management" className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${location.pathname === "/admin/user-management" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}>
                  <Users size={20} /> User Management
                </Link>
              </li>
              <li>
                <Link to="/admin/feedback-support" className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${location.pathname === "/admin/feedback-support" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}>
                  <Users size={20} /> Feedback & Support
                </Link>
              </li>
              <li>
                <Link to="/admin" className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${location.pathname === "/admin/reports" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}>
                  <BarChart size={20} /> Reports
                </Link>
              </li>
              <li>
                <Link to="/admin" className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${location.pathname === "/admin/settings" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}>
                  <Settings size={20} /> Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <nav className="w-full py-4 px-6 bg-white/80 backdrop-blur-md shadow-md flex justify-between items-center fixed top-0 left-72 right-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {pageTitles[location.pathname]}
          </h2>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 rounded-full hover:bg-gray-200 transition">
              <FaSearch size={20} className="text-gray-700" />
            </button>
            <Link to="/" className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition">
              <FaTimes size={20} className="text-white" />
            </Link>
          </div>
        </nav>

        <div className="mt-16 bg-white p-4 rounded shadow">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Issue</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Priority</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            {/* <tbody>
              {filteredData.map((ticket) => (
                <tr key={ticket.id} className="text-center">
                  <td className="border p-2">{ticket.id}</td>
                  <td className="border p-2">{ticket.user}</td>
                  <td className="border p-2">{ticket.issue}</td>
                  <td className="border p-2">{ticket.status}</td>
                  <td className="border p-2">{ticket.priority}</td>
                  <td className="border p-2">{ticket.date}</td>
                  <td className="border p-2">
                    <button className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300">Reply</button>
                    <button className="ml-2 px-2 py-1 border rounded bg-green-500 text-white hover:bg-green-600" onClick={() => handleResolve(ticket.id)} disabled={ticket.status === "Resolved"}>Resolve</button>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeedbackSupport;
