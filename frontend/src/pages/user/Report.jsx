import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { viewTransactionAPI } from '../../services/transactionServices';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Report = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['view-transactions'],
    queryFn: viewTransactionAPI,
  });
  
  // Ensure transactions is always an array
  const transactions = Array.isArray(data) ? data : [];
  if (transactions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 pt-24">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-gray-800">Financial Reports</h2>
          <p className="text-gray-600">No transactions found.</p>
        </div>
      </div>
    );
  }
   
  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    console.error(error); // Log the error for debugging
    return <p className="text-red-500">Failed to load transactions. Please try again.</p>;
  }
  

  const groupedData = transactions.reduce((acc, transaction) => {
    if (!transaction.category || !transaction.type || !transaction.amount) return acc;
    const existing = acc.find((item) => item.category === transaction.category);
    if (existing) {
      existing[transaction.type] += transaction.amount;
    } else {
      acc.push({ category: transaction.category, income: 0, expense: 0, [transaction.type]: transaction.amount });
    }
    return acc;
  }, []);
  
  
  // Check if there are no transactions
  const hasTransactions = transactions && transactions.length > 0;
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Financial Reports</h2>
        <p className="text-gray-600">View and analyze your financial data, including income and expenses.</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
      <BarChart data={groupedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#4CAF50" name="Income" />
        <Bar dataKey="expense" fill="#F44336" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default Report;
