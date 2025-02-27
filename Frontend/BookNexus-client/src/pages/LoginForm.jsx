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
        setServerError(''); // Reset server error

        // Validation logic
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

        // If there are no errors, submit the form
        if (!formErrors.username && !formErrors.password) {
            setIsSubmitting(true); // Disable the submit button during the submission process
            try {
                const dataToSubmit = {
                    username: formData.username,
                    password: formData.password,
                };

                // Axios POST request to submit the login data to your backend API
                const response = await axios.post('http://127.0.0.1:8000/login/', dataToSubmit);
                console.log(response.data,'dataaa');
                

                if (response.data.access) {
                    console.log('Login successful', response.data);
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
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
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-2xl text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="username" className="text-white text-sm">Username or Email</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="text-white text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {serverError && <p className="text-red-500 text-xs mt-2">{serverError}</p>}

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
