
import React, { useState } from 'react';
import { Bell, Edit, Trash2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addBudgetAPI, deleteBudgetAPI, viewBudgetAPI } from '../../services/budgetServices';
import { useFormik } from 'formik';
import { budgetSchema } from '../../schema';

const Budget = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { data: budgets, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['view-budget'],
    queryFn: viewBudgetAPI,
  });
  const { mutateAsync } = useMutation({
    mutationFn: addBudgetAPI,
    mutationKey: ['add-budget'],
  });
  const { mutateAsync: deleteBudget } = useMutation({
    mutationFn: deleteBudgetAPI,
    mutationKey: ['delete-budget']

  });
  
  const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      frequency: "monthly",
      category: "",
      startDate: "",
      limit: ""
    },
    validationSchema:budgetSchema,
    onSubmit: async (values, action) => {    
      try {
        const data = await mutateAsync(values);
        setSuccessMessage(data);
        setErrorMessage(null);
        action.resetForm();
        refetch()
      } catch (error) {
        console.error("Budget submission failed:", error);
        setErrorMessage(error?.response?.data?.message || "Something went wrong!");
      }
    }
    
  });
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="frequency">
                Budget Type
              </label>
              <select
                id="frequency"
                name="frequency"
                value={values.frequency}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
              {errors.frequency && touched.frequency && (
                <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>
              )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                type="text"
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter category"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
              </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="limit">
                Budget Amount
              </label>
              <input
                type="number"
                id="limit"
                name="limit"
                value={values.limit}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter budget amount"
              />
              {errors.limit && (
                <p className="text-red-500 text-sm mt-1">{errors.limit}</p>
              )}
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Create Budget
            </button>

          </form>
          {successMessage && (
  <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
    {successMessage}
  </div>
)}
           {errorMessage && (
  <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
    {errorMessage}
  </div>
)}
        </div>
      )}
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
          {Array.isArray(budgets) && budgets.map((budget) => ( 

             <tr
             key={budget.id}
             className="border-b border-gray-200 hover:bg-gray-100"
           >
             <td className="py-2 px-4">{budget.frequency}</td>
             <td className="py-2 px-4">{budget.category}</td>
             <td className="py-2 px-4">${budget.limit}</td>
             <td className="py-2 px-4 text-red-600">${budget.spent}</td>
             <td className="py-2 px-4 text-green-600">${budget.limit - budget.spent}</td>
             <td className="py-2 px-4">
               {budget.limit - budget.spent > 0 ? "On Track" : "Exceeded"}
             </td>
             <td className="py-2 px-4 flex space-x-3 justify-center">
               <button className="text-blue-600 hover:text-blue-800">
                 <Edit size={18} />
               </button>
               <button
                className="text-red-600 hover:text-red-800"
                onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this budget?")) {
                    try {
                      await deleteBudget(budget._id);
                      refetch();
                    } catch (error) {
                      console.error("Error deleting budget:", error);
                    }
                  }
                }}
              >
                <Trash2 size={18} />
              </button>

             </td>
           </tr>
         ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Budget;
