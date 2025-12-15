import React from 'react';
import { Users, CreditCard, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@eva-ecosystem-nx/feature';

export default function DashboardHome() {
    // Mock data for now
    const stats = [
        { name: 'Total Students', value: '1,200', icon: Users, color: 'bg-blue-500' },
        { name: 'Total Collected', value: formatCurrency(3000000000), icon: CreditCard, color: 'bg-green-500' }, // 30M Naira
        { name: 'Outstanding Fees', value: formatCurrency(500000000), icon: AlertCircle, color: 'bg-red-500' }, // 5M Naira
    ];

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`rounded-md p-3 ${item.color}`}>
                                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{item.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <div className="mt-4 bg-white shadow rounded-lg p-6">
                    <p className="text-gray-500">No recent activity.</p>
                </div>
            </div>
        </div>
    );
}
