import React from 'react'
import { toast } from 'react-hot-toast';

const useSignup = () => {
    const [loading, setLoading] = React.useState(false);

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const isSuccess = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!isSuccess) return;

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            const data = await res.json();
            console.log(data);

        } catch (error) {
            toast.error('An error occurred', error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
}

export default useSignup

const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields');
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }

    return true;
}
