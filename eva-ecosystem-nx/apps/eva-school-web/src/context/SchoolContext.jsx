import React, { createContext, useState, useContext, useEffect } from 'react';
import { calculateFeeStatus } from '@eva-ecosystem-nx/feature';

const SchoolContext = createContext();

export function useSchool() {
    return useContext(SchoolContext);
}

export function SchoolProvider({ children }) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [schoolSettings, setSchoolSettings] = useState({
        block_debtors_from_cbt: false
    });

    // Fetch students on mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Assuming auth token is handled by a global interceptor or proxy, 
                // otherwise we might need to pass headers here.
                // For now, we'll assume a simple fetch to the proxy/API.
                const response = await fetch('/api/students');
                if (response.ok) {
                    const data = await response.json();
                    // Map backend data to frontend structure if needed
                    // Backend returns 'name', frontend expects 'firstName' and 'lastName'
                    // We need to split the name or update frontend to use 'name'
                    // For now, let's split 'name' to maintain compatibility
                    const mappedStudents = data.map(s => {
                        const [firstName, ...lastNameParts] = s.name.split(' ');
                        return {
                            ...s,
                            firstName: firstName || '',
                            lastName: lastNameParts.join(' ') || ''
                        };
                    });
                    setStudents(mappedStudents);
                }
            } catch (error) {
                console.error('Failed to fetch students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Actions
    const updateStudentFees = async (studentId, amountPaidToAdd) => {
        try {
            // Find current student to get total paid
            const student = students.find(s => s._id === studentId);
            if (!student) return;

            const newTotalPaid = student.fees.amount_paid + amountPaidToAdd;

            const response = await fetch(`/api/students/${studentId}/fees`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount_paid: newTotalPaid }),
            });

            if (response.ok) {
                const updatedStudent = await response.json();
                // Update local state
                setStudents(prevStudents => prevStudents.map(s => {
                    if (s._id === studentId) {
                        const [firstName, ...lastNameParts] = updatedStudent.name.split(' ');
                        return {
                            ...updatedStudent,
                            firstName: firstName || '',
                            lastName: lastNameParts.join(' ') || ''
                        };
                    }
                    return s;
                }));
            }
        } catch (error) {
            console.error('Failed to update fees:', error);
        }
    };

    const updateTermFee = (newTermFee) => {
        // TODO: Implement backend endpoint for updating term fee globally or per school
        // For now, update locally to reflect UI changes
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
        loading,
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
