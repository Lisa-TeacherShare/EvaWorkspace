import { calculateFeeStatus, canAccessCBT } from './libs/feature/src/lib/finance.utils';

// Mock Data
const termBill = 50000;
const studentCleared = { fees: { status: 'cleared', amount_paid: 50000, term_bill: 50000 } };
const studentPartial = { fees: { status: 'partial', amount_paid: 30000, term_bill: 50000 } };
const studentOwing = { fees: { status: 'owing', amount_paid: 0, term_bill: 50000 } };

const schoolSettingsLocked = { block_debtors_from_cbt: true };
const schoolSettingsUnlocked = { block_debtors_from_cbt: false };

console.log('--- Verification Start ---');

// 1. Verify Fee Calculation
console.log('Fee Status (50000/50000):', calculateFeeStatus(50000, 50000) === 'cleared' ? 'PASS' : 'FAIL');
console.log('Fee Status (50000/30000):', calculateFeeStatus(50000, 30000) === 'partial' ? 'PASS' : 'FAIL');
console.log('Fee Status (50000/0):', calculateFeeStatus(50000, 0) === 'owing' ? 'PASS' : 'FAIL');

// 2. Verify Gatekeeper Logic
// Unlocked School
console.log('Access (Unlocked, Cleared):', canAccessCBT(studentCleared, schoolSettingsUnlocked) === true ? 'PASS' : 'FAIL');
console.log('Access (Unlocked, Partial):', canAccessCBT(studentPartial, schoolSettingsUnlocked) === true ? 'PASS' : 'FAIL');
console.log('Access (Unlocked, Owing):', canAccessCBT(studentOwing, schoolSettingsUnlocked) === true ? 'PASS' : 'FAIL');

// Locked School
console.log('Access (Locked, Cleared):', canAccessCBT(studentCleared, schoolSettingsLocked) === true ? 'PASS' : 'FAIL');
console.log('Access (Locked, Partial):', canAccessCBT(studentPartial, schoolSettingsLocked) === false ? 'PASS' : 'FAIL');
console.log('Access (Locked, Owing):', canAccessCBT(studentOwing, schoolSettingsLocked) === false ? 'PASS' : 'FAIL');

console.log('--- Verification End ---');
