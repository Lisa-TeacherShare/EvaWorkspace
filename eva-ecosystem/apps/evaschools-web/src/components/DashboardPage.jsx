import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatCard from './StatCard';
import QuizPage from './QuizPage';
import UserPage from './UserPage'; // Import the new UserPage

// This is a small component just for the content of the main dashboard overview
const DashboardOverview = () => (
  <div>
    <h2 className="text-3xl font-bold">Dashboard Overview</h2>
    <p className="text-gray-500 mb-6">Here's a summary of your school's activity.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* These values are static for now, but could be fetched in a real app */}
      <StatCard title="Total Students" value="1,250" />
      <StatCard title="Active Quizzes" value="15" />
      <StatCard title="Teachers" value="45" />
      <StatCard title="Average Score" value="82%" />
    </div>
  </div>
);

const DashboardPage = ({ user, onLogout }) => {
  // This state determines which page is currently visible in the main content area
  const [activePage, setActivePage] = useState('Dashboard');

  // This function decides which component to render based on the activePage state
  const renderContent = () => {
    switch (activePage) {
      case 'Quizzes':
        return <QuizPage />;
      case 'Users':
        return <UserPage />;
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