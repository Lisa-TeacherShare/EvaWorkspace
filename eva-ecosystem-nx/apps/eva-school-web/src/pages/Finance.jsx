import React, { useState } from 'react';
import { Plus, DollarSign, Lock, Unlock } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import FeeSetupModal from '../components/FeeSetupModal';
import { formatCurrency, calculateFeeStatus } from '@eva-ecosystem-nx/feature';

// Mock Data
const MOCK_STUDENTS = [
    { _id: 'std_1', name: 'Musa Ali', school_id: 'school_1', fees: { term_bill: 50000, amount_paid: 30000, status: 'partial' }, qr_code_string: 'eva://std_1' },
    { _id: 'std_2', name: 'Joy Okoro', school_id: 'school_1', fees: { term_bill: 50000, amount_paid: 50000, status: 'cleared' }, qr_code_string: 'eva://std_2' },
    { _id: 'std_3', name: 'Sadiq Yusuf', school_id: 'school_1', fees: { term_bill: 50000, amount_paid: 0, status: 'owing' }, qr_code_string: 'eva://std_3' },
];

export default function Finance() {
    const [students, setStudents] = useState(MOCK_STUDENTS);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isFeeSetupModalOpen, setIsFeeSetupModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [blockDebtors, setBlockDebtors] = useState(false);

    const handlePaymentSuccess = (studentId, amount) => {
        setStudents(students.map(s => {
            if (s._id === studentId) {
                const newPaid = s.fees.amount_paid + amount;
                return {
                    ...s,
                    fees: {
                        ...s.fees,
                        amount_paid: newPaid,
                        status: calculateFeeStatus(s.fees.term_bill, newPaid)
                    }
                };
            }
            return s;
        }));
    };

    const handleFeeSetupSuccess = (amount) => {
        // In a real app, this would update all students in a class
        setStudents(students.map(s => ({
            ...s,
            fees: {
                ...s.fees,
                term_bill: amount,
                status: calculateFeeStatus(amount, s.fees.amount_paid)
            }
        })));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Finance Dashboard</h1>
                <div className="space-x-4">
                    <button
                        onClick={() => setIsFeeSetupModalOpen(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
                    >
                        <DollarSign size={20} />
                        Set Term Fee
                    </button>
                    <button
                        onClick={() => setBlockDebtors(!blockDebtors)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${blockDebtors ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                    >
                        {blockDebtors ? <Lock size={20} /> : <Unlock size={20} />}
                        {blockDebtors ? 'CBT Access Blocked' : 'CBT Access Open'}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term Bill</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                    <div className="text-sm text-gray-500">{student._id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatCurrency(student.fees.term_bill)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatCurrency(student.fees.amount_paid)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${student.fees.status === 'cleared' ? 'bg-green-100 text-green-800' :
                                            student.fees.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {student.fees.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => {
                                            setSelectedStudent(student);
                                            setIsPaymentModalOpen(true);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Record Payment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PaymentModal
                student={selectedStudent}
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onPaymentSuccess={handlePaymentSuccess}
            />

            <FeeSetupModal
                isOpen={isFeeSetupModalOpen}
                onClose={() => setIsFeeSetupModalOpen(false)}
                onSave={handleFeeSetupSuccess}
            />
        </div>
    );
}
