import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        profilePicture: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/api/auth/signup', formData);
            setSuccess(response.data.message);
            navigate('/posts');  // Redirect to post list
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4">Signup</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input type="text" name="username" onChange={handleChange} className="mt-1 p-2 w-full border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" onChange={handleChange} className="mt-1 p-2 w-full border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" name="password" onChange={handleChange} className="mt-1 p-2 w-full border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} className="mt-1 p-2 w-full border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" name="name" onChange={handleChange} className="mt-1 p-2 w-full border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Profile Picture URL</label>
                    <input type="text" name="profilePicture" onChange={handleChange} className="mt-1 p-2 w-full border rounded" />
                </div>
                <div className="mb-4">
                    <input type="checkbox" required />
                    <label className="text-gray-700 ml-2">I agree to the terms and conditions</label>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
