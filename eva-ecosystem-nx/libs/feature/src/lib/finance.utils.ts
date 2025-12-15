// Filename: libs/feature/src/lib/finance.utils.ts

export type FeeStatus = 'cleared' | 'partial' | 'owing';

/**
 * Calculates the fee status based on the term bill and amount paid.
 * @param termBill The total amount due for the term (in Kobo/Cents)
 * @param amountPaid The amount paid so far (in Kobo/Cents)
 * @returns 'cleared' | 'partial' | 'owing'
 */
export const calculateFeeStatus = (termBill: number, amountPaid: number): FeeStatus => {
    if (termBill <= 0) return 'cleared'; // No bill means cleared
    if (amountPaid >= termBill) return 'cleared';
    if (amountPaid > 0) return 'partial';
    return 'owing';
};

/**
 * Formats a number as Nigerian Naira currency.
 * @param amount Amount in Kobo (e.g., 500000 for 5,000 Naira)
 * @returns Formatted string (e.g., "₦5,000.00")
 */
export const formatCurrency = (amount: number): string => {
    // Convert Kobo to Naira
    const naira = amount / 100;
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(naira);
};

/**
 * Checks if a student is allowed to access CBT exams.
 * @param student The student object (must contain fees info)
 * @param schoolSettings The school settings (must contain block_debtors_from_cbt)
 * @returns true if access is allowed, false otherwise
 */
export const canAccessCBT = (
    student: { fees: { status: FeeStatus } },
    schoolSettings: { block_debtors_from_cbt: boolean }
): boolean => {
    // If the school has NOT enabled the lock, everyone can access.
    if (!schoolSettings.block_debtors_from_cbt) {
        return true;
    }

    // If lock is ON, only 'cleared' students can access.
    // Spec says: If (Amount_Paid < Term_Fee) AND (Lock_Active == True) { Block_CBT_Access }
    // which implies 'partial' and 'owing' are blocked.
    return student.fees.status === 'cleared';
};
