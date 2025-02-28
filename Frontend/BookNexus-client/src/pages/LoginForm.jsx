import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = { ...errors };
        setServerError('');

        if (!formData.username) {
            formErrors.username = 'Username is required';
        } else {
            formErrors.username = '';
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        } else {
            formErrors.password = '';
        }

        setErrors(formErrors);

        if (!formErrors.username && !formErrors.password) {
            setIsSubmitting(true);
            try {
                const dataToSubmit = {
                    username: formData.username,
                    password: formData.password,
                };

                const response = await axios.post('http://127.0.0.1:8000/login/', dataToSubmit);
                console.log(response.data, 'dataaa');


                if (response.data.access) {
                    console.log('Login successful', response.data);
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    navigate('/')

                } else {
                    setServerError('Invalid username or password');
                }
            } catch (error) {
                setServerError('An error occurred, please try again!');
                console.error('Error submitting form:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        
        <div className="flex justify-center items-center min-h-screen b">
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
                <h2 className="text-white text-3xl font-semibold text-center mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 bg-opacity-50 text-white rounded-md border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md placeholder-gray-400 transition duration-200"
                            placeholder="Username or Email"
                            required
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 bg-opacity-50 text-white rounded-md border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md placeholder-gray-400 transition duration-200"
                            placeholder="Password"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {serverError && <p className="text-red-500 text-xs mt-2">{serverError}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                        Don't have an account? <a href="/register" className="text-blue-400 hover:underline">Sign up</a>
                    </p>
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
