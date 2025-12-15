import React, { useState } from 'react';
import { DollarSign, Lock, Unlock } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import FeeSetupModal from '../components/FeeSetupModal';
import { formatCurrency } from '@eva-ecosystem-nx/feature';
import { useSchool } from '../context/SchoolContext';

export default function Finance() {
    const { students, schoolSettings, updateStudentFees, updateTermFee, toggleGatekeeper } = useSchool();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isFeeSetupModalOpen, setIsFeeSetupModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handlePaymentSuccess = (studentId, amount) => {
        updateStudentFees(studentId, amount);
    };

    const handleFeeSetupSuccess = (amount) => {
        updateTermFee(amount);
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
                        onClick={toggleGatekeeper}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${schoolSettings.block_debtors_from_cbt ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                    >
                        {schoolSettings.block_debtors_from_cbt ? <Lock size={20} /> : <Unlock size={20} />}
                        {schoolSettings.block_debtors_from_cbt ? 'CBT Access Blocked' : 'CBT Access Open'}
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
                                    <div className="text-sm font-medium text-gray-900">{student.firstName} {student.lastName}</div>
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
