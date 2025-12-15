import React, { useState } from 'react';
import { Save, Lock, Key } from 'lucide-react';

export default function Settings() {
    const [settings, setSettings] = useState({
        blockDebtors: false,
        openaiKey: '',
        geminiKey: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Simulate API save
        setTimeout(() => {
            setLoading(false);
            setMessage('Settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">School Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* The Gatekeeper Section */}
                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                                <Lock className="w-5 h-5 mr-2 text-indigo-500" />
                                The Gatekeeper
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Control access to exams based on fee status.
                            </p>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="blockDebtors"
                                        name="blockDebtors"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        checked={settings.blockDebtors}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="blockDebtors" className="font-medium text-gray-700">
                                        Block Debtors from CBT
                                    </label>
                                    <p className="text-gray-500">
                                        If enabled, students who are "Owing" will be blocked from taking exams in the mobile app.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Keys Section */}
                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                                <Key className="w-5 h-5 mr-2 text-indigo-500" />
                                AI Configuration
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Configure your BYOK (Bring Your Own Key) settings for AI features.
                            </p>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2 space-y-4">
                            <div>
                                <label htmlFor="openaiKey" className="block text-sm font-medium text-gray-700">
                                    OpenAI API Key
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        name="openaiKey"
                                        id="openaiKey"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="sk-..."
                                        value={settings.openaiKey}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="geminiKey" className="block text-sm font-medium text-gray-700">
                                    Google Gemini API Key
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        name="geminiKey"
                                        id="geminiKey"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="AIza..."
                                        value={settings.geminiKey}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    {message && (
                        <span className="mr-4 text-green-600 font-medium flex items-center">
                            {message}
                        </span>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
