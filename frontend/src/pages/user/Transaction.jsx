import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useFormik } from 'formik';
import { transactionSchema } from '../../schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addTransactionAPI, deleteTransactionAPI, viewTransactionAPI } from '../../services/transactionServices';

const Transaction = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { data: transactions, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['view-transactions'],
    queryFn: viewTransactionAPI,
  });
  const { mutateAsync } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ['add-transaction'],
  });
  const { mutateAsync: deleteTransaction } = useMutation({
      mutationFn: deleteTransactionAPI,
      mutationKey: ['delete-transaction']  
    });
  const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
        type: "income",
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
        setErrorMessage(null);
        action.resetForm();
        refetch();
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || "Something went wrong!");
      }
    }
    
  });
  
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
              {errors.type && touched.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
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
            {errors.category && touched.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
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
              {errors.amount && touched.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
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
              {errors.date && touched.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
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
 {errorMessage && (
  <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
    {errorMessage}
  </div>
)}
        </div>
      )}

      {/* Transaction History Table (Design Only) */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h3>
        {isLoading ? (
          <p>Loading transactions...</p>
        ) : isError ? (
          <p>Error loading transactions: {error.message}</p>
        ) : (
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
          {transactions?.map((transaction) => (
             <tr key={transaction._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="py-2">{transaction.category}</td>
                  <td className="py-2 text-green-600">{transaction.amount}</td>
                  <td className="py-2">{transaction.type}</td>
                  <td className="py-2 flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button
                className="text-red-600 hover:text-red-800"
                onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this transaction?")) {
                    try {
                      await deleteTransaction(transaction._id);
                      refetch();
                    } catch (error) {
                      console.error("Error deleting transaction:", error);
                    }
                  }
                }}
              >  <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {transactions?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transaction;
