import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { calculateFeeStatus, formatCurrency } from '@eva-ecosystem-nx/feature';

export default function PaymentModal({ student, isOpen, onClose, onPaymentSuccess }) {
    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState('transfer'); // cash | transfer
    const [loading, setLoading] = useState(false);

    // Reset form when student changes
    useEffect(() => {
        setAmount('');
        setMode('transfer');
    }, [student]);

    if (!isOpen || !student) return null;

    const currentPaid = student.fees.amount_paid;
    const termBill = student.fees.term_bill;
    const paymentAmount = parseInt(amount) * 100 || 0; // Convert to Kobo
    const newTotalPaid = currentPaid + paymentAmount;
    const newStatus = calculateFeeStatus(termBill, newTotalPaid);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            onPaymentSuccess(student._id, paymentAmount);
            setLoading(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Record Payment for {student.firstName} {student.lastName}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Current Balance: <span className="font-bold text-gray-900">{formatCurrency(termBill - currentPaid)}</span>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                        Amount (Naira)
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₦</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="amount"
                                            id="amount"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
                                        Payment Mode
                                    </label>
                                    <select
                                        id="mode"
                                        name="mode"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                                        value={mode}
                                        onChange={(e) => setMode(e.target.value)}
                                    >
                                        <option value="transfer">Bank Transfer</option>
                                        <option value="cash">Cash</option>
                                        <option value="pos">POS</option>
                                    </select>
                                </div>

                                {/* Preview Status */}
                                <div className="bg-gray-50 p-3 rounded-md">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">New Status Preview</p>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900">
                                            Paid: {formatCurrency(newTotalPaid)}
                                        </span>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${newStatus === 'cleared' ? 'bg-green-100 text-green-800' :
                                                newStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {newStatus.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                    >
                                        {loading ? 'Processing...' : 'Confirm Payment'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
