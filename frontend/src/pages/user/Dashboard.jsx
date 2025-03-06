import React from 'react';
import { Link } from 'react-router-dom';
import DashboardImage from "../../assets/dashboard-img.jpg"; // Replace with a relevant user dashboard image
import { useQuery } from '@tanstack/react-query';
import { viewTransactionAPI } from '../../services/transactionServices';
import { viewBudgetAPI } from '../../services/budgetServices';
import { viewSavingsAPI } from '../../services/savingsServices';

const Dashboard = () => {
  const { data: transactions,  } = useQuery({
    queryKey: ['view-transactions'],
    queryFn: viewTransactionAPI,
  });

  const { data: budgets, isLoading } = useQuery({
      queryKey: ['view-budget'],
      queryFn: viewBudgetAPI,
  });

  const { data: savings, isError, error, refetch } = useQuery({
    queryKey: ['view-savings'],
    queryFn: viewSavingsAPI,
  });

  const activeBudget = budgets?.length > 0 ? budgets[0] : null;
  const activeSavings = savings?.length > 0 ? savings[0] : null;
    
  const totalBalance = transactions?.reduce((acc, transaction) => {
    return transaction.type === 'income' 
      ? acc + transaction.amount 
      : acc - transaction.amount;
  }, 0) || 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

// Filter transactions for income in the current month
  const currentMonthIncome = transactions
    ?.filter(transaction => 
      transaction.type === 'income' &&
      new Date(transaction.date).getMonth() === currentMonth &&
      new Date(transaction.date).getFullYear() === currentYear
    ).reduce((acc, transaction) => acc + transaction.amount, 0) || 0;
  
  const currentMonthSavings = savings
    ?.filter(saving => 
      new Date(saving.targetDate).getMonth() === currentMonth &&
      new Date(saving.targetDate).getFullYear() === currentYear
    ).reduce((acc, saving) => acc + (saving.savedAmount || 0), 0) || 0;
  
    const currentMonthExpenses = transactions
    ?.filter(transaction => 
      transaction.type === 'expense' &&
      new Date(transaction.date).getMonth() === currentMonth &&
      new Date(transaction.date).getFullYear() === currentYear
    ).reduce((acc, transaction) => acc + transaction.amount, 0) || 0;

  return (
    <div className="relative text-white" id="home">
      {/* Background Image and Dashboard Content */}
      <div className="relative pt-8">
        {/* Flex Container for Left Image and Right Content (Quote) */}
        <div className="flex items-center justify-between min-h-screen px-6 sm:px-12 lg:px-24">
          {/* Image on the Left */}
          <div className="flex-1 overflow-hidden rounded-lg">
            <img 
              src={DashboardImage} // New image for user dashboard
              alt="User Dashboard Background"
              className="object-cover w-full h-full transform transition duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* Quote on the Right */}
          <div className="flex flex-col items-end max-w-2xl space-y-4 pr-6">
            {/* New Professional Introduction */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-right text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 leading-snug">
              Your Financial Future Starts Here
            </h1>

            {/* Professional Message */}
            <p className="text-lg sm:text-xl text-gray-500 text-right leading-relaxed font-medium max-w-2xl">
              "FinTrack provides you with the tools to take charge of your financial journey. From budgeting and saving to making smart investment decisions, everything you need is at your fingertips."
            </p>

            <p className="text-lg sm:text-xl text-gray-400 text-right leading-relaxed font-medium max-w-2xl">
              "Unlock your financial potential by tracking your progress, setting clear goals, and managing your money with confidence. Let's get started."
            </p>

            {/* Call to Action Button */}
            <div>
            <button
            onClick={() => {
                const target = document.getElementById('financialoverview');
                const offset = -80; // Adjust this value based on the height of your header or any other fixed elements.
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
                window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
                });
            }}
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all 
                duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none"
            >
            View My Financial Overview
            </button>

            </div>
          </div>
        </div>
      </div>

      {/* User Financial Overview Section */}
      <div className="relative z-10 mt-10 text-center pb-10" id='financialoverview'>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Your Financial Overview
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {/* Example Cards - Replace with user data */}
          <div className={`bg-gradient-to-r from-blue-500 to-green-400 text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105`}>
            <h3 className="text-xl font-semibold">Total Balance</h3>
            <p className={`text-2xl font-bold mt-2 ${totalBalance < 0 ? 'text-red-400' : ''}`}>
              ${totalBalance.toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-red-500 text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <h3 className="text-xl font-semibold">Active Budget</h3>
            <p className="text-2xl font-bold mt-2">
                ${activeBudget?.limit ?? 'No active budget'}/Month
              </p>
            
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <h3 className="text-xl font-semibold">Savings</h3>
            <p className="text-2xl font-bold mt-2">
                ${activeSavings?.goalAmount ?? 'No active budget'}/Month
              </p>
          </div>
        </div>
      </div>

      {/* User Financial Health Snapshot Section */}
      <div className="relative z-10 mt-10 bg-gray-50 py-12">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12">
          {/* Section Header */}
          <h2 className="text-4xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
            Financial Health Snapshot
          </h2>

          {/* Financial Snapshot Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Total Debt */}
  <div className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
    <h3 className="text-2xl font-semibold mb-4">Total Debt</h3>
    <p className="text-3xl font-bold text-blue-600 mt-2">
      ${transactions?.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0) || 0}
    </p>
    <p className="text-sm text-gray-600 mt-3">Your total outstanding debt across all accounts.</p>
  </div>

  {/* Savings Rate */}
  <div className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
    <h3 className="text-2xl font-semibold mb-4">Savings Rate</h3>
    <p className="text-3xl font-bold text-green-600 mt-2">
  {currentMonthIncome > 0 
    ? `${((currentMonthSavings / currentMonthIncome) * 100).toFixed(2)}%` 
    : '0%'}
</p>

    <p className="text-sm text-gray-600 mt-3">Percentage of monthly income saved.</p>
  </div>

  {/* Retirement Fund */}
  <div className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
    <h3 className="text-2xl font-semibold mb-4">Retirement Fund</h3>
    <p className="text-3xl font-bold text-indigo-600 mt-2">
      ${savings?.find(s => s.title === 'retirement')?.savedAmount || 0}
    </p>
    <p className="text-sm text-gray-600 mt-3">Your current retirement savings.</p>
  </div>

  {/* Monthly Expenses */}
  <div className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
    <h3 className="text-2xl font-semibold mb-4">Monthly Expenses</h3>
    <p className="text-3xl font-bold text-red-600 mt-2">
  ${currentMonthExpenses}
</p>
    <p className="text-sm text-gray-600 mt-3">Your total spending this month.</p>
  </div>

  {/* Financial Goal Progress */}
  <div className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
    <h3 className="text-2xl font-semibold mb-4">Financial Goal Progress</h3>
    <p className="text-3xl font-bold text-green-600 mt-2">
  {currentMonthIncome > 0 
    ? `${((currentMonthSavings / currentMonthIncome) * 100).toFixed(2)}%` 
    : '0%'}
</p>
    <p className="text-sm text-gray-600 mt-3">Track your progress towards savings goals.</p>
  </div>

  {/* Investment Portfolio */}
  <div className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
    <h3 className="text-2xl font-semibold mb-4">Investment Portfolio</h3>
    <p className="text-3xl font-bold text-orange-600 mt-2">
      +12.3% YTD
    </p>
    <p className="text-sm text-gray-600 mt-3">Your year-to-date return on investments.</p>
  </div>
</div>


          {/* Call to Action */}
          <div className="mt-8 text-center">
          <Link to="/reports">
              <button className="bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-2xl focus:outline-none transition-all duration-300 hover:bg-green-700 transform hover:scale-105">
                View Full Financial Report
              </button>
          </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 bg-gray-50 py-12">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12">
            {/* Section Header */}
            <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-8">
            Financial Insights & Tips
            </h2>

            {/* Insight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Tip 1 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Maximize Your Savings</h3>
                <p className="text-lg text-gray-600 mb-4">
                Review your subscriptions regularly and cancel those that no longer serve you. Even small savings can add up significantly over time.
                </p>
                <Link to="/savings-tips">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition-all duration-300">
                    Learn More
                </button>
                </Link>
            </div>

            {/* Tip 2 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Invest Smartly</h3>
                <p className="text-lg text-gray-600 mb-4">
                Diversify your portfolio to manage risk, and set up automatic contributions to your investment accounts to leverage dollar-cost averaging.
                </p>
                <Link to="/investment-tips">
                <button className="bg-teal-600 text-white px-6 py-2 rounded-lg text-lg font-medium shadow-md hover:bg-teal-700 transition-all duration-300">
                    Learn More
                </button>
                </Link>
            </div>

            {/* Tip 3 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Track Your Spending</h3>
                <p className="text-lg text-gray-600 mb-4">
                Keep an eye on your monthly expenses and find ways to cut back. Setting a clear budget will help you save more and reduce unnecessary spending.
                </p>
                <Link to="/spending-tips">
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg text-lg font-medium shadow-md hover:bg-orange-700 transition-all duration-300">
                    Learn More
                </button>
                </Link>
            </div>
            </div>

            {/* Call to Action */}
            <div className="mt-10 text-center">
            <Link to="/savings">
                <button className="bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl focus:outline-none transition-all duration-300 hover:bg-green-700 transform hover:scale-105">
                Set Your Financial Goals
                </button>
            </Link>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
