import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X,
    BookOpen
} from 'lucide-react';

export default function Dashboard({ onOpenCommandBar }) {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Students', icon: Users, path: '/students' },
        { name: 'Finance', icon: CreditCard, path: '/finance' },
        { name: 'Lesson Architect', icon: BookOpen, path: '/lessons' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-800 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-4 bg-indigo-900">
                    <span className="text-xl font-bold">Eva School</span>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 space-y-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.path}
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(item.path);
                                    setSidebarOpen(false);
                                }}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </a>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-indigo-700">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                                <span className="text-sm font-medium">{currentUser?.email?.[0].toUpperCase()}</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium">{currentUser?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-200 hover:bg-indigo-700 rounded-md"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            {/* Search bar placeholder or title */}
                            <div className="flex items-center">
                                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                onClick={onOpenCommandBar}
                                className="bg-indigo-600 p-1 rounded-full text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center px-3 gap-2"
                            >
                                <span className="text-sm font-medium">Ask AI</span>
                                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-xs font-semibold text-indigo-100 bg-indigo-500 rounded border border-indigo-400">Ctrl K</kbd>
                            </button>
                        </div>
                    </div>
                </div>
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
