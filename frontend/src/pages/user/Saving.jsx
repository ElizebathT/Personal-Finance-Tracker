import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

const Savings = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Savings Goals</h2>
        <p className="text-gray-600">Set, track, and adjust your savings goals.</p>
      </div>

      {/* Create Savings Goal Button */}
      <div className="max-w-4xl mx-auto mt-6">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          {isFormVisible ? 'Cancel' : 'Set Savings Goal'}
        </button>
      </div>

      {/* Create Savings Goal Form (Design Only) */}
      {isFormVisible && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="goalAmount">
                Goal Amount ($)
              </label>
              <input
                type="number"
                id="goalAmount"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter goal amount"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="savedAmount">
                Saved Amount ($)
              </label>
              <input
                type="number"
                id="savedAmount"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter saved amount"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="goalDate">
                Goal Target Date
              </label>
              <input
                type="date"
                id="goalDate"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
            >
              Set Goal
            </button>
          </form>
        </div>
      )}

      {/* Savings Goals List (Design Only) */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Savings Goals</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2">Goal Amount</th>
              <th className="py-2">Saved Amount</th>
              <th className="py-2">Progress</th>
              <th className="py-2">Target Date</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for savings goal rows */}
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2"></td>
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

export default Savings;
