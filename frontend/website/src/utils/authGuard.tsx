"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type AuthGuardProps = {
    children: React.ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login'); // Redirect to login if no token
        }
    }, [router]);

    return <>{children}</>; // Render children if authenticated
};

export default AuthGuard;
