import React, { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock Auth Check
        const user = localStorage.getItem('eva_user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock Login
        // return signInWithEmailAndPassword(auth, email, password);
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = { email, uid: 'mock-uid-123', emailVerified: true };
                localStorage.setItem('eva_user', JSON.stringify(user));
                setCurrentUser(user);
                resolve(user);
            }, 500);
        });
    };

    const logout = async () => {
        // return signOut(auth);
        return new Promise((resolve) => {
            localStorage.removeItem('eva_user');
            setCurrentUser(null);
            resolve();
        });
    };

    const value = {
        currentUser,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
