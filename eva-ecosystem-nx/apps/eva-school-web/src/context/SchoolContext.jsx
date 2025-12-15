import React, { createContext, useState, useContext, useEffect } from 'react';
import { calculateFeeStatus } from '@eva-ecosystem-nx/feature';

const SchoolContext = createContext();

export function useSchool() {
    return useContext(SchoolContext);
}

// Initial Mock Data
const INITIAL_STUDENTS = [
    {
        _id: 'std_1',
        firstName: 'Musa',
        lastName: 'Ali',
        educationLevel: 'Junior',
        school_id: 'school_1',
        fees: {
            term_bill: 5000000, // 50,000 Naira
            amount_paid: 3000000, // 30,000 Naira
            status: 'partial'
        },
        qr_code_string: 'eva://std_1'
    },
    {
        _id: 'std_2',
        firstName: 'Chioma',
        lastName: 'Okeke',
        educationLevel: 'Senior',
        school_id: 'school_1',
        fees: {
            term_bill: 5000000,
            amount_paid: 5000000, // Cleared
            status: 'cleared'
        },
        qr_code_string: 'eva://std_2'
    },
    {
        _id: 'std_3',
        firstName: 'Bayo',
        lastName: 'Ogunlesi',
        educationLevel: 'Junior',
        school_id: 'school_1',
        fees: {
            term_bill: 5000000,
            amount_paid: 0, // Owing
            status: 'owing'
        },
        qr_code_string: 'eva://std_3'
    }
];

export function SchoolProvider({ children }) {
    const [students, setStudents] = useState(INITIAL_STUDENTS);
    const [schoolSettings, setSchoolSettings] = useState({
        block_debtors_from_cbt: false
    });

    // Actions
    const updateStudentFees = (studentId, amountPaidToAdd) => {
        setStudents(prevStudents => prevStudents.map(student => {
            if (student._id === studentId) {
                const newPaid = student.fees.amount_paid + amountPaidToAdd;
                return {
                    ...student,
                    fees: {
                        ...student.fees,
                        amount_paid: newPaid,
                        status: calculateFeeStatus(student.fees.term_bill, newPaid)
                    }
                };
            }
            return student;
        }));
    };

    const updateTermFee = (newTermFee) => {
        setStudents(prevStudents => prevStudents.map(student => ({
            ...student,
            fees: {
                ...student.fees,
                term_bill: newTermFee,
                status: calculateFeeStatus(newTermFee, student.fees.amount_paid)
            }
        })));
    };

    const toggleGatekeeper = () => {
        setSchoolSettings(prev => ({
            ...prev,
            block_debtors_from_cbt: !prev.block_debtors_from_cbt
        }));
    };

    const value = {
        students,
        schoolSettings,
        updateStudentFees,
        updateTermFee,
        toggleGatekeeper
    };

    return (
        <SchoolContext.Provider value={value}>
            {children}
        </SchoolContext.Provider>
    );
}
