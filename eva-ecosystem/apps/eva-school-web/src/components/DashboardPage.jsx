import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatCard from './StatCard';
import QuizPage from './QuizPage'; // Import the new QuizPage

const DashboardOverview = () => (
  <div>
    <h2 className="text-3xl font-bold">Dashboard Overview</h2>
    <p className="text-gray-500 mb-6">Here's a summary of your school's activity.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* In a real app, these values would come from API calls */}
      <StatCard title="Total Students" value="1,250" />
      <StatCard title="Active Quizzes" value="15" />
      <StatCard title="Teachers" value="45" />
      <StatCard title="Average Score" value="82%" />
    </div>
  </div>
);

const DashboardPage = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState('Dashboard'); // 'Dashboard' or 'Quizzes'

  const renderContent = () => {
    switch (activePage) {
      case 'Quizzes':
        return <QuizPage />;
      case 'Dashboard':
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={onLogout} setActivePage={setActivePage} />
      <div className="flex-1 p-8">
        <Header user={user} />
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;