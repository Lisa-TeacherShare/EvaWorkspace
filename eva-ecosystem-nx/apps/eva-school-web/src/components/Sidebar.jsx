import React from 'react';
import { LogOut, LayoutDashboard, BookOpen, Users, BarChart2 } from 'lucide-react';

const Sidebar = ({ onLogout, setActivePage }) => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, name: 'Dashboard' },
    { icon: <BookOpen size={20} />, name: 'Quizzes' },
    { icon: <Users size={20} />, name: 'Users' },
    { icon: <BarChart2 size={20} />, name: 'Analytics' },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-6 text-2xl font-bold text-gray-900 border-b">Eva Portal</div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className="w-full flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors text-left"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;