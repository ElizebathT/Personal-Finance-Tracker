import React, { useState } from 'react';
import { Bell, Edit, Trash2 } from 'lucide-react';

const Budget = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Budget Management</h2>
        <p className="text-gray-600">Create and monitor your budgets efficiently.</p>
      </div>

      {/* Create Budget Button */}
      <div className="max-w-4xl mx-auto mt-6">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <Bell className="mr-2" /> {isFormVisible ? 'Cancel' : 'Create Budget'}
        </button>
      </div>

      {/* Create Budget Form (Design Only, No Logic) */}
      {isFormVisible && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="budgetType">
                Budget Type
              </label>
              <select
                id="budgetType"
                className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="monthly">Monthly</option>
                <option value="category">Category-based</option>
              </select>
            </div>

            {true && (  // Always show category field, for design purpose
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter category"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="budgetAmount">
                Budget Amount
              </label>
              <input
                type="number"
                id="budgetAmount"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter budget amount"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="spentAmount">
                Amount Spent
              </label>
              <input
                type="number"
                id="spentAmount"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter amount spent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Create Budget
            </button>
          </form>
        </div>
      )}

      {/* Budget Monitoring Section (Design Only, No Logic) */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Monitor Your Budget</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2">Type</th>
              <th className="py-2">Category</th>
              <th className="py-2">Budget Amount</th>
              <th className="py-2">Amount Spent</th>
              <th className="py-2">Remaining</th>
              <th className="py-2">Alerts</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for budget rows */}
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2 text-green-600"></td>
              <td className="py-2 flex space-x-3">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
