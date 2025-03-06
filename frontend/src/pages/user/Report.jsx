import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { viewTransactionAPI } from '../../services/transactionServices';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Report = () => {
  const { data: transactions, isLoading, isError, error } = useQuery({
    queryKey: ['view-transactions'],
    queryFn: viewTransactionAPI,
  });
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    console.error(error);
    return <p className="text-red-500">Failed to load transactions. Please try again.</p>;
  }
  
  const transactionsArray = Array.isArray(transactions) ? transactions : [];
  if (transactionsArray.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 pt-24 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Financial Reports</h2>
        <p className="text-gray-600">No transactions found.</p>
      </div>
    );
  }

  const totalIncome = transactionsArray.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactionsArray.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  
  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses }
  ];
  
  const COLORS = ['#4CAF50', '#F44336'];

  const monthlyData = transactionsArray.reduce((acc, t) => {
    const date = new Date(t.date);
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
    acc[month][t.type] += t.amount;
    return acc;
  }, {});

  const lineChartData = Object.values(monthlyData);

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Financial Reports</h2>
        <p className="text-gray-600">View and analyze your financial data, including income and expenses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#4CAF50" name="Income" />
              <Line type="monotone" dataKey="expense" stroke="#F44336" name="Expense" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Report;
