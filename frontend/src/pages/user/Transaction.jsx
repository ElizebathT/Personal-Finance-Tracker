import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { addTransactionAPI } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { transactionSchema } from '../../schema';
import { useMutation } from '@tanstack/react-query';

const Transaction = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [successMessage, setSuccessMessage] = useState(null);
  const { mutateAsync, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ['add-transaction'],
  });
  
  const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
        type: "",
        amount: 0,
        category: "",
        date: "",
        description: "",
        isRecurring: false,
        recurrenceInterval: ""
    },
    validationSchema:transactionSchema,
    onSubmit: async (values, action) => {    
      try {
       
        const data = await mutateAsync(values);
        setSuccessMessage(data);
        action.resetForm();
      } catch (error) {
        console.error("Transaction submission failed:", error);
      }
    }
    
  });
  console.log(errors);
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Transactions</h2>
        <p className="text-gray-600">Track your income and expenses efficiently.</p>
      </div>

      {/* Add Transaction Button */}
      <div className="max-w-4xl mx-auto mt-6">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <PlusCircle className="mr-2" /> {isFormVisible ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>

      {/* Add Transaction Form (Design Only) */}
      {isFormVisible && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Transaction Type</label>
              <select  name="type"  id="type"  onChange={handleChange}  onBlur={handleBlur}  value={values.type}  className="w-full p-3 border border-gray-300 rounded-lg">

                <option value="income" name="type"  id="type" >Income</option>
                <option value="expense" name="type"  id="type" >Expense</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"  // Add this
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter category"
              />

            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                name="amount"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter amount"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                id="date"
                name="date"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Transaction
            </button>
          </form>
          {successMessage && (
  <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
    {successMessage}
  </div>
)}

        </div>
      )}

      {/* Transaction History Table (Design Only) */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2">Date</th>
              <th className="py-2">Category</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Type</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for transaction rows */}
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2 text-green-600"></td>
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

export default Transaction;
