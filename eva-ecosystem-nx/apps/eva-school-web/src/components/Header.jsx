import React from 'react';

const Header = ({ user }) => (
  <header className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user.name}!</h1>
      <p className="text-gray-500">You are logged in as an {user.role}.</p>
    </div>
  </header>
);

export default Header;
